# Chatbox one-click import

These presets create a custom provider without embedding an API key or a stale model list.

[Import LinkAGI Chat into Chatbox](chatbox://provider/import?config=eyJpc0N1c3RvbSI6dHJ1ZSwiaWQiOiJsaW5rYWdpLWNoYXQiLCJuYW1lIjoiTGlua0FHSSBDaGF0IiwidHlwZSI6Im9wZW5haSIsImljb25VcmwiOiJodHRwczovL2RvY3MubGlua3RvYWdpLmNvbS9mYXZpY29uLnN2ZyIsInVybHMiOnsid2Vic2l0ZSI6Imh0dHBzOi8vYXBpLmxpbmt0b2FnaS5jb20vP3V0bV9zb3VyY2U9Y2hhdGJveCZ1dG1fbWVkaXVtPXByb3ZpZGVyX2ltcG9ydCZ1dG1fY2FtcGFpZ249ZWNvc3lzdGVtXzIwMjYwODA0JnV0bV9jb250ZW50PXdlYnNpdGUiLCJnZXRBcGlLZXkiOiJodHRwczovL2FwaS5saW5rdG9hZ2kuY29tL3NpZ24tdXA/dXRtX3NvdXJjZT1jaGF0Ym94JnV0bV9tZWRpdW09cHJvdmlkZXJfaW1wb3J0JnV0bV9jYW1wYWlnbj1lY29zeXN0ZW1fMjAyNjA4MDQmdXRtX2NvbnRlbnQ9Z2V0X2FwaV9rZXkiLCJkb2NzIjoiaHR0cHM6Ly9kb2NzLmxpbmt0b2FnaS5jb20vP3V0bV9zb3VyY2U9Y2hhdGJveCZ1dG1fbWVkaXVtPXByb3ZpZGVyX2ltcG9ydCZ1dG1fY2FtcGFpZ249ZWNvc3lzdGVtXzIwMjYwODA0JnV0bV9jb250ZW50PWRvY3MiLCJtb2RlbHMiOiJodHRwczovL2FwaS5saW5rdG9hZ2kuY29tL3ByaWNpbmc/dXRtX3NvdXJjZT1jaGF0Ym94JnV0bV9tZWRpdW09cHJvdmlkZXJfaW1wb3J0JnV0bV9jYW1wYWlnbj1lY29zeXN0ZW1fMjAyNjA4MDQmdXRtX2NvbnRlbnQ9bW9kZWxzIn0sInNldHRpbmdzIjp7ImFwaUhvc3QiOiJodHRwczovL2FwaS5saW5rdG9hZ2kuY29tIn19)

If the browser does not open custom URI schemes from GitHub, use the local generator below.

1. Install Chatbox.
2. Generate a deep link:

```bash
node integrations/chatbox/generate-links.mjs integrations/chatbox/linkagi-chat.json
```

3. Open the generated `chatbox://provider/import?...` link.
4. Add a low-limit LinkAGI test key locally, then fetch or copy a current model ID from the live marketplace.

`linkagi-chat.json` uses the OpenAI-compatible Chat Completions route. `linkagi-responses.json` uses the Responses route used by Codex-style models. Import only the protocol required by the client.

The links in each preset use a Chatbox-specific source, campaign, and content value. Production registration/recharge attribution remains unverified until the server-side attribution build is deployed.
