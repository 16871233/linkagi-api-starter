# Integration status

Checked: 2026-08-04 CST.

| Asset or channel | Current state | Evidence boundary |
| --- | --- | --- |
| OpenAPI 3.1 | Locally valid JSON; public docs URL still serves HTML fallback | Ready to publish, not deployed to docs site |
| Postman collection/environment | Public on Postman API Network; logged-out page shows 5 requests in 4 folders; environment API key is empty | Public collection verified 2026-08-04; no paid request was run from Postman |
| APIs.json discovery manifest | Public repository manifest points to docs, OpenAPI, Postman, signup, pricing, status, terms, privacy, support and source repository | Ready for API directory discovery; not yet deployed at the official domain root |
| Chatbox Chat/Responses presets | Schema matched to current Chatbox source; no API key or fixed model list | Deep links generated locally; in-app import and paid call not yet tested |
| Compatibility runner | Route and secret-handling review complete | Requires a new short-lived low-limit key for fresh protocol tests |
| models.dev | Provider manifest draft only | Not submitted; stable pricing/model capability evidence is incomplete |
| CC Switch | Feature request draft only | Not filed; repository requires a real client test first |
| Cherry Studio | Provider proposal documented | Not filed; streaming/tool-call client evidence is incomplete |
| CCNavX | Public PR #4 open and mergeable | Not merged and no public LinkAGI listing yet |
| Server-side attribution | Implemented and tested in local product source | Not deployed; production source-to-registration/recharge reporting is unavailable |

The API route itself has prior real evidence for OpenAI Chat Completions (`claude-opus-4-6`, 2026-08-03) and Responses (`gpt-5.6-sol`, 2026-08-04). Those samples do not prove long-term availability, streaming, tools, native Messages, Gemini, or client-specific compatibility.

Public Postman collection: <https://www.postman.com/lhs-1-s-team/linkagi-api/collection/8nl8r40/linkagi-api>
