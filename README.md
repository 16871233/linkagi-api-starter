# LinkAGI API Starter


面向国内开发者的 AI API 中转站发现与验证包：提供 **OpenAI Chat Completions、Responses 以及其他 provider-style 路由**的配置候选、机器可读规范和可重复测试，用于核对模型、协议、Token 与逐次扣费。当前公开成功证据只覆盖 Chat Completions 与 Responses；Claude Code、Gemini CLI 和其他客户端仍需独立实测。

> 内容更新时间：2026-09-07。模型、价格、倍率和路由状态都可能变化，请以控制台、状态页和逐次调用日志为准。


- 注册并创建低额度测试 Key：<https://api.linktoagi.com/sign-up?utm_source=github&utm_medium=repository&utm_campaign=ecosystem_20260907&utm_content=readme_signup>
- 完整中文文档：<https://docs.linktoagi.com/>
- 实时模型与价格：<https://api.linktoagi.com/pricing?utm_source=github&utm_medium=repository&utm_campaign=ecosystem_20260907&utm_content=readme_models>
- 动态价格说明与成本核对：<https://docs.linktoagi.com/pricing.html?utm_source=github&utm_medium=repository&utm_campaign=ecosystem_20260907&utm_content=price_guide>


> 不要把真实 API Key 提交到 Git 仓库。下面所有 `sk-...` 都是占位符。


## 可导入资产


- [OpenAPI 3.1 规范](openapi/linkagi.openapi.json)
- [Postman 集合与环境](postman/)
- [公开 Postman API Network 集合](https://www.postman.com/lhs-1-s-team/linkagi-api/collection/8nl8r40/linkagi-api)
- [APIs.json 发现清单](apis.json)
- [机器可读实时价格 JSON](https://api.linktoagi.com/api/pricing)
- [公开状态 JSON](https://api.linktoagi.com/api/status)
- [Chatbox Chat / Responses 一键导入配置](integrations/chatbox/)
- [脱敏兼容性测试脚本](compatibility/)
- [生态接入与真实性边界](INTEGRATION_STATUS.md)


这些资产默认不带 Key，也不写死会变化的模型列表。鉴权模型列表尚无最新公开成功证据；发送付费请求前应从实时模型广场复制模型名，并用低额度短效 Key 验证当前令牌分组。


公开 Postman 集合包含 5 个请求，覆盖模型发现、OpenAI Chat Completions、OpenAI Responses、Messages-style 与 Gemini-style `generateContent`。集合描述的是请求表面，不代表五项都已成功调用；API Key 只能保存在自己的本地环境变量中。


## 30 秒路由自检


macOS、Linux 或 WSL 可以直接运行仓库里的只读自检脚本。它不会读取或打印真实 API Key，也不会发起付费模型调用；只验证 DNS、TLS 与四种协议路由是否能到达鉴权层。


```bash
chmod +x linkagi-preflight.sh
./linkagi-preflight.sh
```


未携带 Key 时，`/v1/models`、`/v1/responses`、`/v1/messages` 和 Gemini-style 路由返回 JSON `401` 属于预期结果。它只证明请求到达鉴权层，不证明协议或客户端兼容。

## 兼容性状态矩阵

| 客户端或协议 | 路由级检查 | 真实客户端成功证据 | 说明 |
| --- | --- | --- | --- |
| OpenAI Chat Completions | 已完成 | 已完成 | 可用模型和 Key 权限仍需按当前控制台核对 |
| OpenAI Responses / Codex | 已完成 | 已完成 | 使用 `https://api.linktoagi.com/v1`，模型名以实时列表为准 |
| Anthropic Messages / Claude Code | 已完成 | 待补充 | 目前只记录候选 Base URL，不把路由检查当成客户端兼容承诺 |
| Gemini generateContent / Gemini CLI | 已完成 | 待补充 | 首次调用请使用低额度短效 Key，并记录模型、状态码和响应结构 |
