# OpenAI-compatible API 返回 401、404、429：通用排错清单

这份清单适用于 Codex、Claude Code、Gemini CLI、Cherry Studio、Cursor 以及其他 OpenAI-compatible 客户端。先定位请求在哪一层失败，再决定是否更换模型或服务。

## 401：请求到达了，但认证没有通过

```bash
test -n "$API_KEY" && echo "key exists" || echo "key missing"
printf '%s\n' "$BASE_URL"
```

检查 Key 是否完整、是否被撤销、当前令牌分组是否有权限，以及客户端是否真的读取了当前终端里的变量。不要打印真实 Key。

## 404：地址或模型路由不匹配

- Codex / Responses 候选地址通常包含 `/v1`，客户端继续请求 `/responses`。
- Claude Code 候选地址通常使用根地址，客户端继续请求 `/v1/messages`。
- Gemini CLI 候选地址通常使用根地址，客户端继续请求 `/v1beta/models/...`。
- 模型名必须从当前服务的实时模型列表复制，不能照搬旧教程。

不要把完整接口路径再填进 Base URL，避免客户端重复拼接。

## 429：频率、并发或余额限制

先降低并发和重试频率，再查看使用日志中的分组、模型和余额。不要只根据客户端显示的错误判断，服务端日志能确认是否实际扣费。

## 5xx 或超时：区分上游和本地配置

用相同 Key、相同模型发送一条最小文本请求。只有某一个模型失败时，优先检查该模型的实时可用状态；所有模型都失败时，再检查地址、网络和服务公告。

## 最小验证顺序

1. 打印最终 Base URL（不要打印 Key）。
2. 运行仓库根目录的 `bash linkagi-preflight.sh`。
3. 创建独立、低额度、可撤销的测试 Key。
4. 发送一条短文本请求，不要一开始启用工具调用、图片和超长上下文。
5. 到控制台按时间、模型、Token、状态和扣费核对结果。

LinkAGI 公开入口：<https://api.linktoagi.com/>；中文文档：<https://docs.linktoagi.com/>。LinkAGI 是独立的第三方 API 聚合服务，与 OpenAI、Anthropic、Google 没有官方隶属关系。模型、价格和可用性以实时控制台和文档为准。
