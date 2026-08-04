# Compatibility evidence

`test-compatibility.sh` records status, elapsed time, content type, and usage fields without storing the API key or response text.

Use a low-limit, short-lived key. Model tests are opt-in so a plain run only lists models:

```bash
export LINKAGI_API_KEY='sk-local-only'
export LINKAGI_RESPONSES_MODEL='gpt-5.6-sol'
LINKAGI_TEST_OUTPUT=/tmp/linkagi-results.ndjson ./compatibility/test-compatibility.sh
```

Set `LINKAGI_CHAT_MODEL`, `LINKAGI_CLAUDE_MODEL`, or `LINKAGI_GEMINI_MODEL` only after copying a current compatible model ID from the marketplace. Disable the test key after the run and verify Token usage and the actual deduction in the LinkAGI usage log.

An HTTP 200 sample proves only that route, model, pool, key, and request at that time. It is not an SLA or proof of upstream model identity.
