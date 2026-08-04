# Feature request draft: LinkAGI provider preset

## Use case

LinkAGI is an AI API relay that documents Codex Responses, Messages-style, and Gemini-style routes under one account. Current public success evidence covers Responses, while native Messages, Gemini, and CC Switch client compatibility still require testing. A future CC Switch preset could reduce Base URL mistakes while keeping the API key local.

## Proposed preset

- Name: `LinkAGI`
- Codex base URL: `https://api.linktoagi.com/v1`
- Claude base URL: `https://api.linktoagi.com`
- Gemini base URL: `https://api.linktoagi.com`
- API key: user-entered, never bundled
- Documentation: `https://docs.linktoagi.com/cc-switch-api.html?utm_source=cc_switch&utm_medium=client_preset&utm_campaign=ecosystem_20260804&utm_content=feature_issue`
- Live models and prices: `https://api.linktoagi.com/pricing?utm_source=cc_switch&utm_medium=client_preset&utm_campaign=ecosystem_20260804&utm_content=models`

## Verification evidence required before filing

- Fresh CC Switch local test on macOS or Windows.
- At least one successful Codex Responses request and one successful supported Claude/Gemini request.
- Sanitized route/status/Token evidence with the test key disabled afterward.
- Chinese, English, and Japanese visible text if a UI change is needed.

This draft is intentionally not filed as an issue until the real CC Switch test is complete, following the repository contribution policy.
