# Claude Code 返回 401：Base URL 与 API Key 排错

Claude Code 返回 HTTP 401 时，请先确认认证信息和请求地址。下面的步骤只读取本地环境变量是否存在，不会打印 API Key，也不会发起付费模型调用。

## 1. 确认变量在同一个终端可见

```bash
test -n "$ANTHROPIC_AUTH_TOKEN" && echo "token exists" || echo "token missing"
printf '%s\n' "$ANTHROPIC_BASE_URL"
```

如果 Token 显示 `missing`，检查 `~/.claude/settings.json` 或当前 shell 的导出配置。不要用 `echo "$ANTHROPIC_AUTH_TOKEN"` 打印真实 Token。

## 2. 检查 Base URL 层级

Claude Code 会继续请求 `/v1/messages`。候选配置通常写根地址：

```dotenv
ANTHROPIC_BASE_URL=https://api.linktoagi.com
```

不要把完整接口路径写进 Base URL，也不要在客户端已经自动拼接 `/v1/messages` 时重复添加 `/v1`。不同客户端版本可能有差异，最终以实际请求日志为准。

## 3. 区分状态码

| 状态码 | 优先检查 |
| --- | --- |
| 401 | Token 缺失、复制错误、已撤销，或请求发到了不接受该 Token 的入口 |
| 403 | Token 有效但没有模型/分组权限，或触发策略限制 |
| 404 | 路径或模型路由不匹配，检查是否多写 `/v1`、模型名是否来自实时列表 |
| 429 | 并发、频率或余额限制 |
| 5xx | 上游渠道、模型可用性和服务端状态 |

## 4. 先做最小验证

先运行仓库根目录的只读路由预检：

```bash
bash linkagi-preflight.sh
```

无 Key 时，路由返回 401 只能证明请求到达鉴权层，不能证明模型或客户端已经兼容。创建低额度测试 Key 后，先发一条短文本，再到控制台核对请求时间、模型、Token、状态和扣费。

## 5. 安全边界

使用独立、低额度、可撤销的测试 Key。不要把 Key 放进 Git、截图、评论或录屏；测试完成后可以撤销并重新创建。

文档与注册入口：

- <https://docs.linktoagi.com/>
- <https://api.linktoagi.com/>
- B 站配套说明：<https://www.bilibili.com/read/cv52916587/>

LinkAGI 是独立的第三方 API 聚合服务，与 Anthropic、OpenAI、Google 没有官方隶属关系。模型、价格和可用性会变化，请以实时控制台和文档为准。本文是通用排错资料，不构成官方 Claude Code 支持声明。
