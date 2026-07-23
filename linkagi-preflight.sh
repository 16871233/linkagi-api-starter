#!/usr/bin/env bash
# LinkAGI API 中转站路由自检。
# 不读取、不打印 API Key，也不会发起付费模型调用。
set -euo pipefail

ROOT_URL="https://api.linktoagi.com"
TMP_BODY="$(mktemp -t linkagi-preflight.XXXXXX)"
trap 'rm -f "$TMP_BODY"' EXIT

pass=0
check=0

print_result() {
  local name="$1"
  local expected="$2"
  local actual="$3"
  if [[ "$actual" == "$expected" ]]; then
    printf 'PASS  %-22s HTTP %s\n' "$name" "$actual"
    pass=$((pass + 1))
  else
    printf 'CHECK %-22s expected %s, got %s\n' "$name" "$expected" "$actual"
    check=$((check + 1))
  fi
}

request_code() {
  curl -sS -o "$TMP_BODY" -w '%{http_code}' --max-time 15 "$@" || true
}

echo "LinkAGI API route preflight"
echo "Target: $ROOT_URL"
echo

root_code="$(request_code "$ROOT_URL/")"
print_result "Console / TLS" "200" "$root_code"

models_code="$(request_code "$ROOT_URL/v1/models")"
print_result "OpenAI models" "401" "$models_code"

responses_code="$(request_code \
  -X POST -H 'content-type: application/json' -d '{}' \
  "$ROOT_URL/v1/responses")"
print_result "Codex Responses" "401" "$responses_code"

messages_code="$(request_code \
  -X POST -H 'content-type: application/json' -d '{}' \
  "$ROOT_URL/v1/messages")"
print_result "Claude Messages" "401" "$messages_code"

gemini_code="$(request_code \
  -X POST -H 'content-type: application/json' -d '{}' \
  "$ROOT_URL/v1beta/models/gemini-3.1-pro:generateContent")"
print_result "Gemini generateContent" "401" "$gemini_code"

echo
printf 'Summary: %s PASS, %s CHECK\n' "$pass" "$check"
echo "A 401 here only proves the route reached authentication."
echo "Create a key at $ROOT_URL and use the live model list before a paid call."

[[ "$check" -eq 0 ]]
