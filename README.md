# LinkAGI API Starter

LinkAGI 是面向开发者的 AI API 中转站，提供人民币按量计费、独立 API Key、模型与分组选择，以及逐次调用日志。这个仓库放接入说明、请求样例和排错工具，由 LinkAGI 运营方维护。

**[打开在线接入导航](https://16871233.github.io/linkagi-api-starter/)**：复制客户端地址、查看首次调用步骤、估算 Token 费用。

[注册 LinkAGI](https://api.linktoagi.com/sign-up?utm_source=github&utm_medium=repository&utm_campaign=organic_entry_20260923&utm_content=readme_signup) · [实时模型与价格](https://api.linktoagi.com/pricing?utm_source=github&utm_medium=repository&utm_campaign=organic_entry_20260923&utm_content=readme_pricing) · [完整中文文档](https://docs.linktoagi.com/) · [联系客服](https://docs.linktoagi.com/about.html#support)

想先试用，可以[联系客服领取体验额度](https://docs.linktoagi.com/about.html#support)。当前输入、输出和缓存价格都在[模型广场](https://api.linktoagi.com/pricing)，选好模型与分组后即可查看。

首次使用可以按这个顺序操作：

1. 注册并完成邮箱验证，联系客服领取体验额度，或在[钱包](https://api.linktoagi.com/wallet)充值。
2. 从[模型广场](https://api.linktoagi.com/pricing)选择模型和分组，再到[API 密钥](https://api.linktoagi.com/keys)创建独立测试 Key。
3. 按下方教程配置客户端，先发送一条短请求。
4. 到[使用日志](https://api.linktoagi.com/usage-logs/common)核对模型、Token、状态与扣费，再决定是否继续使用。

Chat Completions、Responses 的调用样例与各客户端进度见[验证记录](INTEGRATION_STATUS.md)。Claude Code、Gemini CLI 目前提供配置参考，完整客户端流程尚未实测。

遇到错误时可查阅 [Claude Code 401](docs/claude-code-401.md)、[通用 401/404/429 清单](docs/api-401-404-429-checklist.md)，也可以下载[浏览器路由诊断工具](tools/linkagi-diagnose.html)。

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
- [Claude Code 401 排错文档](docs/claude-code-401.md)
- [通用 401/404/429 排错清单](docs/api-401-404-429-checklist.md)
- [浏览器路由诊断工具](tools/linkagi-diagnose.html)
- [生态接入与真实性边界](INTEGRATION_STATUS.md)

这些资产不含 API Key。导入后填入自己的 Key，并从模型广场复制当前模型名。

公开 Postman 集合包含 5 个请求，覆盖模型发现、OpenAI Chat Completions、OpenAI Responses、Messages-style 与 Gemini-style `generateContent`。集合描述的是请求表面，不代表五项都已成功调用；API Key 只能保存在自己的本地环境变量中。

## 30 秒路由自检

macOS、Linux 或 WSL 可以直接运行仓库里的只读自检脚本。它不会读取或打印真实 API Key，也不会发起付费模型调用；只验证 DNS、TLS 与四种协议路由是否能到达鉴权层。

```bash
chmod +x linkagi-preflight.sh
./linkagi-preflight.sh
```

未携带 Key 时，`/v1/models`、`/v1/responses`、`/v1/messages` 和 Gemini-style 路由返回 JSON `401` 属于预期结果。它只证明请求到达鉴权层，不证明协议或客户端兼容。

## Base URL 速查

按客户端选择地址；Claude Code 和 Gemini CLI 为待实测配置参考。

| 工具 | Base URL | 客户端继续请求的路径 |
| --- | --- | --- |
| Codex / OpenAI Responses | `https://api.linktoagi.com/v1` | `/responses` |
| Claude Code | `https://api.linktoagi.com` | `/v1/messages` |
| Gemini CLI | `https://api.linktoagi.com` | `/v1beta/models/...` |

地址形式不同：Claude Code 与 Gemini CLI 的文档候选使用根地址，Codex 自定义 Responses 提供方写到 `/v1`。实际使用前仍需用当前模型名和低额度短效 Key 验证。

## 1. Codex 中转站配置

用户级配置文件：

- macOS / Linux / WSL：`~/.codex/config.toml`
- Windows：`%USERPROFILE%\.codex\config.toml`

```toml
model_provider = "linkagi"
model = "copy-current-responses-model-id"
model_reasoning_effort = "high"

[model_providers.linkagi]
name = "LinkAGI"
base_url = "https://api.linktoagi.com/v1"
wire_api = "responses"
env_key = "LINKAGI_API_KEY"
```

macOS / Linux / WSL：

```bash
export LINKAGI_API_KEY="sk-替换为你的Key"
codex
```

Windows PowerShell：

```powershell
[Environment]::SetEnvironmentVariable(
  "LINKAGI_API_KEY",
  "sk-替换为你的Key",
  "User"
)
```

启动后输入 `/status`，确认提供方为 `linkagi`。完整排错见 [Codex 中转站配置教程](https://docs.linktoagi.com/codex-api.html?utm_source=github&utm_medium=referral&utm_campaign=github-starter)。

## 2. Claude Code 中转站配置

> 验证边界：以下是待实测配置候选。当前没有原生 Anthropic Messages 或 Claude Code 客户端成功证据。

编辑 `~/.claude/settings.json`（Windows 为 `%USERPROFILE%\.claude\settings.json`）：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-替换为你的Key",
    "ANTHROPIC_BASE_URL": "https://api.linktoagi.com",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
  }
}
```

这里的 Base URL **不要添加 `/v1`**。Claude Code 会继续请求 `/v1/messages`。完整排错见 [Claude Code 中转站教程](https://docs.linktoagi.com/claude-code-api.html?utm_source=github&utm_medium=referral&utm_campaign=github-starter)。

## 3. Gemini CLI 中转站配置

> 验证边界：以下是待实测配置候选。当前没有 Gemini `generateContent` 或 Gemini CLI 客户端成功证据。

创建 `~/.gemini/.env`：

```dotenv
GOOGLE_GEMINI_BASE_URL="https://api.linktoagi.com"
GEMINI_API_KEY="sk-替换为你的Key"
GEMINI_MODEL="copy-current-gemini-route-model-id"
```

再在 `~/.gemini/settings.json` 中选择 API Key 认证：

```json
{
  "security": {
    "auth": {
      "selectedType": "gemini-api-key"
    }
  }
}
```

模型名是占位符；使用前从实时模型广场复制当前 ID，并把首次结果视为兼容性测试而不是既定支持。完整候选配置见 [Gemini CLI 中转站教程](https://docs.linktoagi.com/gemini-cli-api.html?utm_source=github&utm_medium=referral&utm_campaign=github-starter)。

## 4. 不带 Key 的路由预检

这些命令只检查域名、TLS、反向代理和协议路由能否到达鉴权层，不消耗模型额度：

```bash
curl -i https://api.linktoagi.com/v1/models

curl -i https://api.linktoagi.com/v1/responses \
  -X POST -H 'content-type: application/json' -d '{}'

curl -i https://api.linktoagi.com/v1/messages \
  -X POST -H 'content-type: application/json' -d '{}'

curl -i 'https://api.linktoagi.com/v1beta/models/gemini-3.1-pro:generateContent' \
  -X POST -H 'content-type: application/json' -d '{}'
```

返回 JSON `401` 通常意味着路由已经到达鉴权层；它不代表某个模型、Key 或余额已经验证成功。

## 5. 常见错误

| 现象 | 优先检查 |
| --- | --- |
| `401 Invalid token` | 当前进程是否读到环境变量、Key 是否完整、令牌是否有效 |
| `404 Invalid URL` | Codex 是否缺 `/v1`；Claude/Gemini 是否多写了 `/v1` |
| `model not found` / `403` | 模型 ID 是否精确、令牌分组是否支持模型 |
| `429` | 并发、频率与分组限流 |
| `5xx` / timeout | 短请求是否可用、实时号池状态、系统公告与使用日志 |

## 价格与调用记录

在[实时模型广场](https://api.linktoagi.com/pricing?utm_source=github&utm_medium=repository&utm_campaign=organic_entry_20260923&utm_content=readme_pricing_details)查看分组价格，在控制台核对每次调用的用量和扣费。接入自己的项目时，先跑一条短请求，再测试需要的工具调用、流式输出或长上下文功能。

## 联系支持

- 文档：<https://docs.linktoagi.com/>
- 邮箱：<linktoagi@163.com>
- 关于与客服：<https://docs.linktoagi.com/about.html>

如果这份速查帮你定位了问题，欢迎 Star 或分享给同样在配置 Codex、Claude Code、Gemini CLI 的开发者。
