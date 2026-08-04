#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${LINKAGI_BASE_URL:-https://api.linktoagi.com}"
KEY="${LINKAGI_API_KEY:-}"
OUT="${LINKAGI_TEST_OUTPUT:-./linkagi-compatibility-results.ndjson}"

if [[ -z "$KEY" ]]; then
  echo "Set LINKAGI_API_KEY to a low-limit, short-lived test key." >&2
  exit 2
fi

umask 077
: > "$OUT"

request() {
  local name="$1"
  local method="$2"
  local url="$3"
  local body="$4"
  local auth_header="$5"
  local extra_header="${6:-}"
  local response_file metrics http_code elapsed content_type usage
  response_file="$(mktemp)"

  if [[ -n "$extra_header" ]]; then
    metrics="$(curl --silent --show-error --output "$response_file" --request "$method" \
      --header "$auth_header" --header "$extra_header" --header 'content-type: application/json' \
      --data "$body" --write-out '%{http_code}\t%{time_total}\t%{content_type}' "$url" || true)"
  else
    metrics="$(curl --silent --show-error --output "$response_file" --request "$method" \
      --header "$auth_header" --header 'content-type: application/json' \
      --data "$body" --write-out '%{http_code}\t%{time_total}\t%{content_type}' "$url" || true)"
  fi

  IFS=$'\t' read -r http_code elapsed content_type <<< "$metrics"
  usage="$(jq -c '(.usage // {}) | {input_tokens,prompt_tokens,output_tokens,completion_tokens,total_tokens}' "$response_file" 2>/dev/null || printf '{}')"
  jq -cn \
    --arg checked_at "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    --arg test "$name" \
    --arg url "$url" \
    --arg status "${http_code:-000}" \
    --arg elapsed_seconds "${elapsed:-}" \
    --arg content_type "${content_type:-}" \
    --argjson usage "$usage" \
    '{checked_at:$checked_at,test:$test,url:$url,http_status:$status,elapsed_seconds:$elapsed_seconds,content_type:$content_type,usage:$usage}' >> "$OUT"
  rm -f "$response_file"
}

request "models" "GET" "$BASE_URL/v1/models" "" "Authorization: Bearer $KEY"

if [[ -n "${LINKAGI_CHAT_MODEL:-}" ]]; then
  request "chat_completions" "POST" "$BASE_URL/v1/chat/completions" \
    "$(jq -cn --arg model "$LINKAGI_CHAT_MODEL" '{model:$model,messages:[{role:"user",content:"Reply with: LinkAGI Chat ok"}],stream:false,max_tokens:32}')" \
    "Authorization: Bearer $KEY"
fi

if [[ -n "${LINKAGI_RESPONSES_MODEL:-}" ]]; then
  request "responses" "POST" "$BASE_URL/v1/responses" \
    "$(jq -cn --arg model "$LINKAGI_RESPONSES_MODEL" '{model:$model,input:"Reply with: LinkAGI Responses ok",stream:false,max_output_tokens:32}')" \
    "Authorization: Bearer $KEY"
fi

if [[ -n "${LINKAGI_CLAUDE_MODEL:-}" ]]; then
  request "anthropic_messages" "POST" "$BASE_URL/v1/messages" \
    "$(jq -cn --arg model "$LINKAGI_CLAUDE_MODEL" '{model:$model,max_tokens:32,messages:[{role:"user",content:"Reply with: LinkAGI Messages ok"}]}')" \
    "x-api-key: $KEY" "anthropic-version: 2023-06-01"
fi

if [[ -n "${LINKAGI_GEMINI_MODEL:-}" ]]; then
  request "gemini_generate_content" "POST" "$BASE_URL/v1beta/models/$LINKAGI_GEMINI_MODEL:generateContent" \
    '{"contents":[{"role":"user","parts":[{"text":"Reply with: LinkAGI Gemini ok"}]}],"generationConfig":{"maxOutputTokens":32}}' \
    "x-goog-api-key: $KEY"
fi

echo "Wrote sanitized results to $OUT"
