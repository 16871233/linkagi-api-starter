# 用 LinkAGI 接入 Codex CLI

这里是 LinkAGI 运营方维护的配置模板。已有 Codex CLI，想换成 LinkAGI 的 API，可以用这个独立配置，不必覆盖原来的 `config.toml`。

[注册 LinkAGI](https://api.linktoagi.com/sign-up?utm_source=github&utm_medium=download&utm_campaign=codex_kit_20261028) · [查看模型和价格](https://api.linktoagi.com/pricing) · [QQ群 342205412：进群可领 3 元体验额度](https://qm.qq.com/q/E968hOM5Ka)

## 先选分组

Codex 专用 Sale 组倍率为 **0.15**。接自己的脚本或其他客户端时，选择标注“可外接”的 Plus / Pro，别直接照搬 Sale 组。倍率是站内计费系数，具体人民币单价看模型广场。

在 [API 密钥](https://api.linktoagi.com/keys) 创建对应分组的 Key，账号有调用额度后再启动。模板模型是 `gpt-6.1-sol`，也可以替换为该分组支持的其他 Responses 模型。

## 放好配置文件

运行 `codex --version`。下面的独立 profile 文件适用于 **Codex CLI 0.134.0 及以上**，不作为桌面 App 的导入包。

把同目录的 `linkagi.config.toml` 放在：

- macOS / Linux：`~/.codex/linkagi.config.toml`
- Windows：`%USERPROFILE%\.codex\linkagi.config.toml`

文件夹不存在就创建；已有同名文件时先备份。这里没有安装脚本，也不会替你修改配置。

## 填入 Key，启动

macOS / Linux，在自己的终端中运行，提示后粘贴 Key（输入不回显）：

```bash
printf 'LinkAGI API Key: '
IFS= read -r -s LINKAGI_API_KEY
export LINKAGI_API_KEY
printf '\n'
codex --profile linkagi
```

Windows PowerShell：

```powershell
$linkagiSecret = Read-Host 'LinkAGI API Key' -AsSecureString
$env:LINKAGI_API_KEY = [System.Net.NetworkCredential]::new('', $linkagiSecret).Password
codex --profile linkagi
```

Key 只供当前终端会话使用。配置文件里不用填 Key，也不要把 Key 发到群里。

启动后输入 `/status`，确认提供方是 LinkAGI、模型是所选型号。若仍显示其他提供方，检查项目里的 `.codex/config.toml` 或额外启动参数是否覆盖了 profile。

先在空目录发送一条短消息，例如“只回复连接成功，不操作文件”，再到 [使用日志](https://api.linktoagi.com/usage-logs/common) 核对记录和扣费。这一步会使用你的调用额度。

下次不用 LinkAGI 时，直接运行 `codex` 即可使用原有默认配置。关闭终端后，如需再次用此 profile，重新设置 Key。

## 卡在哪里，就看哪里

| 提示 | 检查项 |
| --- | --- |
| 找不到 profile | CLI 版本是否支持独立 profile；文件是否放在 `.codex` 下、是否误保存成 `.toml.txt` |
| 缺少 `LINKAGI_API_KEY` | 在启动 Codex 的同一个终端里设置变量 |
| 401 / 余额不足 | Key 是否完整、有效，令牌额度和账户余额是否足够 |
| 404 | Base URL 是 `https://api.linktoagi.com/v1`，不要重复 `/v1` |
| 模型不可用 | 核对完整模型 ID、Key 分组及模型支持的接口 |
| 429 / 5xx | 先停一下，按错误提示重试；持续异常联系群内管理员 |

[完整接入教程](https://docs.linktoagi.com/codex-api.html) · [报错排查](https://16871233.github.io/linkagi-api-starter/api-errors.html) · [加群二维码](https://docs.linktoagi.com/about.html#qq-community)

配置格式依据 [OpenAI：Profiles](https://learn.chatgpt.com/docs/config-file/config-advanced#profiles) 和 [网关配置](https://learn.chatgpt.com/docs/enterprise/roll-out-a-gateway#what-to-distribute)，核对于 2026-10-28。模板已做 TOML 与公开模型配置核验，本次未执行带密钥的客户端调用；实际可用性以你的首次调用结果为准。
