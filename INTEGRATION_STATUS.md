# Integration status

Original asset audit: 2026-08-04 CST. Latest public endpoint check: 2026-09-17 CST. Dates in each row are the relevant verification dates.

| Asset or channel | Current state | Evidence boundary |
| --- | --- | --- |
| OpenAPI 3.1 | [Public docs JSON](https://docs.linktoagi.com/openapi/linkagi.openapi.json) returns OpenAPI 3.1.0, title LinkAGI API, with 7 paths; checked 2026-09-17 | The specification is publicly accessible; this is not a paid-call compatibility test |
| Postman collection/environment | Public on Postman API Network; logged-out page shows 5 requests in 4 folders; environment API key is empty | Public collection verified 2026-08-04; no paid request was run from Postman |
| APIs.json discovery manifest | Public repository manifest points to docs, OpenAPI, Postman, signup, pricing, status, terms, privacy, support and source repository | Ready for API directory discovery; not yet deployed at the official domain root |
| Public pricing/status JSON | `/api/pricing` and `/api/status` returned unauthenticated HTTP 200 JSON on 2026-08-04; pricing response contained 53 model entries | Public and documented in OpenAPI; prices remain time-varying |
| Chatbox Chat/Responses presets | Schema matched to current Chatbox source; no API key or fixed model list | Deep links generated locally; in-app import and paid call not yet tested |
| Compatibility runner | Route and secret-handling review complete | Requires a new short-lived low-limit key for fresh protocol tests |
| models.dev | Provider manifest draft only | Not submitted; stable pricing/model capability evidence is incomplete |
| CC Switch | Feature request draft only | Not filed; repository requires a real client test first |
| Cherry Studio | Provider proposal documented | Not filed; streaming/tool-call client evidence is incomplete |
| CCNavX GitHub directory | [PR #4](https://github.com/silankfakentend/ai-api-providers/pull/4) merged on 2026-08-08; rechecked 2026-09-13 | The GitHub directory entry is merged; a separate CCNavX website profile and referral conversions are not verified |
| APIs.io | Submission reference `34f28e5f` accepted into the review queue | Pending review; no public detail page verified |
| APIs.guru | [Issue #2970](https://github.com/APIs-guru/openapi-directory/issues/2970) remains open; public docs-domain OpenAPI URL added on 2026-09-17 | Requested, not merged into the directory |
| CLIRank | Submission `sub-1785853295012-zpbnd3` returned HTTP 201 | Pending review; no public listing verified |
| FindAPI | Previously recorded as submitted after human verification | No public LinkAGI listing verified; submission is not evidence of acceptance |
| getcheapai registry | [PR #2](https://github.com/getcheapai/ai-proxy-registry/pull/2) still open on 2026-09-13 | Not merged; a public website listing is not verified |
| AI API 公益站与 Token 中转站导航 | Existing LinkAGI entry confirmed in [main](https://github.com/1sh1ro/ai-api-zhongzhuan); [PR #9](https://github.com/1sh1ro/ai-api-zhongzhuan/pull/9) submitted 2026-09-17 to refresh signup URL and pricing | The existing entry predates this update; new corrections await review, and referral conversions are not verified |
| mn-api/awesome-ai-proxy | [Issue #52](https://github.com/mn-api/awesome-ai-proxy/issues/52) submitted 2026-09-17 | Open application; not added to the directory yet |
| howardpen9/awesome-ai-api-proxy | [Issue #83](https://github.com/howardpen9/awesome-ai-api-proxy/issues/83) submitted 2026-09-17 and automatically closed by the form check; template-heading mismatch reported in the same issue | Closed pending maintainer review; not a listed entry |
| Server-side attribution | Implemented and tested in local product source | Not deployed; production source-to-registration/recharge reporting is unavailable |

The API route itself has prior real evidence for OpenAI Chat Completions (`claude-opus-4-6`, 2026-08-03) and Responses (`gpt-5.6-sol`, 2026-08-04). Those samples do not prove long-term availability, streaming, tools, native Messages, Gemini, or client-specific compatibility.

Public Postman collection: <https://www.postman.com/lhs-1-s-team/linkagi-api/collection/8nl8r40/linkagi-api>

## Current onboarding notes (2026-09-13)

- New-account automatic credit is currently zero. Historical CNY 0.2 signup-credit claims are no longer current. Contact support to confirm any available trial before making a paid request.
- Current console paths: `/sign-up`, `/pricing`, `/keys`, `/wallet`, and `/usage-logs/common`. Some older guides still show legacy console paths.
- The online starter documentation includes address copying and a local-only Token cost estimator. It does not collect keys or send model requests.
