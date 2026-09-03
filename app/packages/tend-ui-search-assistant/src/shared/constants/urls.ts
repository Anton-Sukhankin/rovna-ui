type RuntimeConfig = {
  searchAssistant?: {
    apiUrl?: string;
  };
};

const runtimeConfig = (
  globalThis as typeof globalThis & { __ROVNA_UI_RUNTIME_CONFIG__?: RuntimeConfig }
).__ROVNA_UI_RUNTIME_CONFIG__?.searchAssistant;

export const SEARCH_URL = runtimeConfig?.apiUrl ?? '';
