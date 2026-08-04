# Cherry Studio provider draft

`linkagi.ts` follows the current `packages/provider-registry/src/providers/` schema and exposes the four protocol families already routed by the LinkAGI server. It is a compile-time draft, not an accepted Cherry Studio provider.

To evaluate it in an upstream checkout, copy it beside `types.ts`, add `p_linkagi` to `providers/index.ts`, regenerate the catalog, and run the provider-registry tests. A public PR should not be opened until the current Cherry Studio application has also been tested against model listing, Chat Completions, Responses, native Messages, Gemini, streaming, and tool calls.

Proposed links:

- Website: `https://api.linktoagi.com/?utm_source=cherry_studio&utm_medium=provider_registry&utm_campaign=ecosystem_20260804&utm_content=website`
- Get API key: `https://api.linktoagi.com/sign-up?utm_source=cherry_studio&utm_medium=provider_registry&utm_campaign=ecosystem_20260804&utm_content=get_api_key`
- Documentation: `https://docs.linktoagi.com/?utm_source=cherry_studio&utm_medium=provider_registry&utm_campaign=ecosystem_20260804&utm_content=docs`
- Models: `https://api.linktoagi.com/pricing?utm_source=cherry_studio&utm_medium=provider_registry&utm_campaign=ecosystem_20260804&utm_content=models`

Do not embed a production key, fixed Sale pricing, or unverified capabilities in an upstream PR.
