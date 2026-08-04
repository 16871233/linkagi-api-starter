# LinkAGI API Starter

面向国内开发者的 AI API 中转站接入与验证包：用一套 LinkAGI 控制台连接 **Codex、Claude Code、Gemini CLI、Postman 与 Chatbox**，并用可重复测试核对模型、协议、Token 和逐次扣费。

- 注册并创建低额度测试 Key：<https://api.linktoagi.com/sign-up?utm_source=github&utm_medium=repository&utm_campaign=ecosystem_20260804&utm_content=readme_signup>
- 完整中文文档：<https://docs.linktoagi.com/>
- 实时模型与价格：<https://api.linktoagi.com/pricing?utm_source=github&utm_medium=repository&utm_campaign=ecosystem_20260804&utm_content=readme_models>
- GPT-5.6 人民币成本计算器：<https://docs.linktoagi.com/tools/gpt-cost-calculator/?utm_source=github&utm_medium=referral&utm_campaign=github-starter>

> 不要把真实 API Key 提交到 Git 仓库。下面所有 `sk-...` 都是占位符。

## 可导入资产

- [OpenAPI 3.1 规范](openapi/linkagi.openapi.json)
- [Postman 集合与环境](postman/)
- [公开 Postman API Network 集合](https://www.postman.com/lhs-1-s-team/linkagi-api/collection/8nl8r40/linkagi-api)
- [APIs.json 发现清单](apis.json)
- [Chatbox Chat / Responses 一键导入配置](integrations/chatbox/)
- [脱敏兼容性测试脚本](compatibility/)
- [生态接入与真实性边界](INTEGRATION_STATUS.md)

这些资产默认不带 Key，也不写死会变化的模型列表。先运行模型列表请求，再从当前令牌分组中选择模型。

公开 Postman 集合包含 5 个请求，覆盖模型发现、OpenAI Chat Completions、OpenAI Responses、Anthropic Messages 与 Gemini-style `generateContent`。先 Fork 集合或直接在 Postman 中运行，再把自己的低额度测试 Key 只保存在本地环境变量中。

## 30 秒路由自检

macOS、Linux 或 WSL 可以直接运行仓库里的只读自检脚本。它不会读取或打印真实 API Key，也不会发起付费模型调用；只验证 DNS、TLS 与四种协议路由是否能到达鉴权层。

```bash
chmod +x linkagi-preflight.sh
./linkagi-preflight.sh
```

未携带 Key 时，`/v1/models`、`/v1/responses`、`/v1/messages` 和 Gemini-compatible 路由返回 JSON `401` 属于预期结果。脚本文件放在仓库根目录，便于直接下载和复查。

## Base URL 速查

| 工具 | Base URL | 客户端继续请求的路径 |
| --- | --- | --- |
| Codex / OpenAI Responses | `https://api.linktoagi.com/v1` | `/responses` |
| Claude Code | `https://api.linktoagi.com` | `/v1/messages` |
| Gemini CLI | `https://api.linktoagi.com` | `/v1beta/models/...` |

最容易犯的错误是把三种地址写成同一个形式：Claude Code 与 Gemini CLI 使用根地址，Codex 自定义 Responses 提供方则写到 `/v1`。

## 1. Codex 中转站配置

用户级配置文件：

- macOS / Linux / WSL：`~/.codex/config.toml`
- Windows：`%USERPROFILE%\.codex\config.toml`

```toml
model_provider = "linkagi"
model = "gpt-5.6-luna"
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

创建 `~/.gemini/.env`：

```dotenv
GOOGLE_GEMINI_BASE_URL="https://api.linktoagi.com"
GEMINI_API_KEY="sk-替换为你的Key"
GEMINI_MODEL="gemini-3.1-pro"
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

模型名只是示例；使用前从实时模型广场复制当前可用 ID。完整排错见 [Gemini CLI 中转站教程](https://docs.linktoagi.com/gemini-cli-api.html?utm_source=github&utm_medium=referral&utm_campaign=github-starter)。

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

## 价格与可用性边界

模型、号池、倍率和输入/输出价格会变化，本仓库不维护一个容易过期的“最低价”数字。请以[实时模型广场](https://api.linktoagi.com/pricing?utm_source=github&utm_medium=repository&utm_campaign=ecosystem_20260804&utm_content=price_boundary)和自己的逐次使用日志为准。

一次 HTTP 200 只证明当时的模型、号池、Key 和请求成功，不等于长期稳定、官方直连或模型身份鉴定。重要任务应使用固定样例测试工具调用、长上下文、结构化输出和失败模式，并准备备用路线。

## 联系支持

- 文档：<https://docs.linktoagi.com/>
- 邮箱：<linktoagi@163.com>
- 关于与客服：<https://docs.linktoagi.com/about.html>

如果这份速查帮你定位了问题，欢迎 Star 或分享给同样在配置 Codex、Claude Code、Gemini CLI 的开发者。
