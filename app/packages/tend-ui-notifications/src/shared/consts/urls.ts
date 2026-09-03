type RuntimeConfig = {
  notifications?: {
    apiUrl?: string;
    webSocketUrl?: string;
  };
};

const runtimeConfig = (
  globalThis as typeof globalThis & { __ROVNA_UI_RUNTIME_CONFIG__?: RuntimeConfig }
).__ROVNA_UI_RUNTIME_CONFIG__?.notifications;

const location = typeof window === 'undefined' ? undefined : window.location;
const sameOriginWebSocketUrl = location
  ? `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/connection/websocket`
  : 'ws://localhost/connection/websocket';

export const NOTIFICATIONS_URL = runtimeConfig?.apiUrl ?? '';
export const CENTRIFUGE_URL = runtimeConfig?.webSocketUrl ?? sameOriginWebSocketUrl;
