# Integration status

Original asset audit: 2026-08-04 CST. Latest channel review: 2026-09-20 CST. Dates in each row are the relevant verification dates.

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
| getcheapai registry | [PR #2](https://github.com/getcheapai/ai-proxy-registry/pull/2) still open on 2026-09-20 | Not merged; a public website listing is not verified |
| AI API 公益站与 Token 中转站导航 | [PR #9](https://github.com/1sh1ro/ai-api-zhongzhuan/pull/9) merged 2026-09-18; updated signup URL and dated pricing verified in [live site data](https://1sh1ro.github.io/ai-api-zhongzhuan/data/sites.json) on 2026-09-20 | This updates an existing entry; it is not a new listing. Referral conversions are not verified |
| mn-api/awesome-ai-proxy | [Issue #52](https://github.com/mn-api/awesome-ai-proxy/issues/52) still open on 2026-09-20 | Open application; not added to the directory yet |
| howardpen9/awesome-ai-api-proxy | [Issue #93](https://github.com/howardpen9/awesome-ai-api-proxy/issues/93) submitted through the required browser form on 2026-09-24; `new-provider` label present and OPEN, replacing the form-rejected #83 | Pending maintainer review; not a listed entry |
| ProxyCC | Application submitted through the [directory's intake](https://proxycc.cc/submit) on 2026-09-20; questionnaire completion confirmed | Pending review; no public listing verified |
| RouterHubs | Application sent to the business address specified on the [submission page](https://routerhubs.com/submit) on 2026-09-20; mail service confirmed send success | Email sent; review, delivery and public listing not verified |
| AI Rank | Application sent to the address specified on the [application page](https://ai-rank.cloud/apply/) on 2026-09-20; mail service confirmed send success | Email sent; review, delivery and public listing not verified |
| Awesome Claude API | [PR #25](https://github.com/peter123023/awesome-claude-api/pull/25) submitted 2026-09-20 with public pricing/docs and an explicit note that monthly traffic is not publicly verified | Pending maintainer review; not a merged directory entry |
| Server-side attribution | Implemented and tested in local product source | Not deployed; production source-to-registration/recharge reporting is unavailable |

The API route itself has prior real evidence for OpenAI Chat Completions (`claude-opus-4-6`, 2026-08-03) and Responses (`gpt-5.6-sol`, 2026-08-04). Those samples do not prove long-term availability, streaming, tools, native Messages, Gemini, or client-specific compatibility.

Public Postman collection: <https://www.postman.com/lhs-1-s-team/linkagi-api/collection/8nl8r40/linkagi-api>

## Current onboarding notes (2026-09-20)

- New users can contact support to request trial credit, as described in the current console announcement. Support confirms the arrangement and amount; signup does not automatically add credit. Historical CNY 0.2 automatic signup-credit claims are no longer current.
- Current console paths: `/sign-up`, `/pricing`, `/keys`, `/wallet`, and `/usage-logs/common`. Some older guides still show legacy console paths.
- The online starter documentation includes address copying and a local-only Token cost estimator. It does not collect keys or send model requests.
