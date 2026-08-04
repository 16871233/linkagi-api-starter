# models.dev submission draft

`provider.toml` is a provider manifest draft, not an accepted models.dev listing.

Do not submit it until all of these are true:

- The public documentation serves a real machine-readable OpenAPI document instead of an HTML fallback.
- Stable public USD-per-million prices can be mapped to exact model IDs and updated when a pool changes.
- Chat Completions, Responses, streaming, tool calls, model listing, and advertised context limits have reproducible tests.
- Each model TOML states only capabilities observed or documented for that exact route.

Sale pool prices are deliberately excluded because a temporary multiplier is not a stable canonical models.dev price.
