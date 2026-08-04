import { defineProvider } from './types'

export default defineProvider({
  id: 'linkagi',
  name: 'LinkAGI',
  defaultChatEndpoint: 'openai-chat-completions',
  endpointConfigs: {
    'anthropic-messages': {
      adapterFamily: 'newapi',
      baseUrl: 'https://api.linktoagi.com'
    },
    'openai-chat-completions': {
      adapterFamily: 'newapi',
      baseUrl: 'https://api.linktoagi.com'
    },
    'openai-responses': {
      baseUrl: 'https://api.linktoagi.com'
    },
    'google-generate-content': {
      baseUrl: 'https://api.linktoagi.com'
    }
  },
  metadata: {
    website: {
      apiKey:
        'https://api.linktoagi.com/sign-up?utm_source=cherry_studio&utm_medium=provider_registry&utm_campaign=ecosystem_20260804&utm_content=get_api_key',
      docs:
        'https://docs.linktoagi.com/?utm_source=cherry_studio&utm_medium=provider_registry&utm_campaign=ecosystem_20260804&utm_content=docs',
      models:
        'https://api.linktoagi.com/pricing?utm_source=cherry_studio&utm_medium=provider_registry&utm_campaign=ecosystem_20260804&utm_content=models',
      official:
        'https://api.linktoagi.com/?utm_source=cherry_studio&utm_medium=provider_registry&utm_campaign=ecosystem_20260804&utm_content=official'
    }
  }
})
