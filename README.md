# LinkAGI API Starter

面向国内开发者的 AI API 中转站接入速查：用一套 LinkAGI 控制台配置 **Codex、Claude Code、Gemini CLI**，并快速判断 `/v1`、API Key、模型名和令牌分组问题。

- API 控制台：<https://api.linktoagi.com/?utm_source=github&utm_medium=referral&utm_campaign=github-starter>
- 完整中文文档：<https://docs.linktoagi.com/>
- 实时模型与价格：<https://api.linktoagi.com/pricing?utm_source=github&utm_medium=referral&utm_campaign=github-starter>
- GPT-5.6 人民币成本计算器：<https://docs.linktoagi.com/tools/gpt-cost-calculator/?utm_source=github&utm_medium=referral&utm_campaign=github-starter>

> 不要把真实 API Key 提交到 Git 仓库。下面所有 `sk-...` 都是占位符。

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

## GPT-5.6 API 价格快照

2026-07-23 的 LinkAGI 公开快照中，`gpt-5.6-luna` Sale 号池约为：

- 输入：`¥0.12 / 百万 Token`
- 输出：`¥0.72 / 百万 Token`

最低档号池可能补量、暂停或调整。不要把快照当成长期承诺，请以 [实时模型广场](https://api.linktoagi.com/pricing?utm_source=github&utm_medium=referral&utm_campaign=github-starter) 和实际使用日志为准。

## 联系支持

- 文档：<https://docs.linktoagi.com/>
- 邮箱：<linktoagi@163.com>
- 关于与客服：<https://docs.linktoagi.com/about.html>

如果这份速查帮你定位了问题，欢迎 Star 或分享给同样在配置 Codex、Claude Code、Gemini CLI 的开发者。
