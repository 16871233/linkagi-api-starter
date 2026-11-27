# RikkaHub 安卓手机接入 LinkAGI

[完整图文教程（8 张截图）](https://docs.linktoagi.com/#mobile) · [RikkaHub 官方下载](https://rikka-ai.com/download) · [LinkAGI 控制台](https://api.linktoagi.com)

RikkaHub 是一款开源安卓 AI 聊天客户端。它提供手机聊天界面，接入 LinkAGI 后，模型调用从你的 LinkAGI 余额扣费。

## 配置速查

以下配置对应 2026-11-26 实测的 DeepSeek 分组：

| 字段 | 填写内容 |
| --- | --- |
| 提供商类型 | OpenAI |
| 名称 | LinkAGI |
| API Base URL | `https://api.linktoagi.com/v1` |
| API 路径 | `/chat/completions` |
| API Key | 在控制台选择 DeepSeek 分组创建的密钥 |
| Response API | 关闭 |
| 模型 ID | `deepseek-v4.1-flash`，或从当前模型列表选择 |

保存提供商后，在“模型”标签页获取模型列表并添加模型；再去“默认模型和提示词”选择聊天模型。需要自动标题或聊天建议时，同时设置快速模型；不用这些功能可以关闭对应开关。

不要把 `/chat/completions` 重复填入 Base URL。API Key 填自己的，不要公开分享带密钥的提供商二维码或导出配置。

## 已验证范围

RikkaHub 3.3.1、Android 11 模拟器、DeepSeek 分组，流式文本聊天和连续追问已完成；服务端日志确认两次请求正常结算。其他模型、图片、语音与工具调用不在这次验证范围内。

不同分组的接口和客户端限制可能不同。手机聊天不要直接套用 Codex 专用组或仅限 Claude Code 的组；先查看[实时模型与价格](https://api.linktoagi.com/pricing)。
