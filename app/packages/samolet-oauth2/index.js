const STORAGE_KEY = 'SAMOLET_OAUTH2_JWT_AUTH_PARAMS';

function safeLocalStorage() {
  if (typeof window === 'undefined') return undefined;
  return window.localStorage;
}

function parseStoredAuthParams(value) {
  if (!value) return undefined;

  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch (_error) {
    return { access: value };
  }

  return undefined;
}

const authStorage = {
  getJwtAuthParams() {
    const storage = safeLocalStorage();
    return parseStoredAuthParams(storage?.getItem(STORAGE_KEY));
  },

  setJwtAuthParams(params) {
    const storage = safeLocalStorage();
    if (!storage) return;

    if (!params) {
      storage.removeItem(STORAGE_KEY);
      return;
    }

    storage.setItem(STORAGE_KEY, JSON.stringify(params));
  },

  clearJwtAuthParams() {
    const storage = safeLocalStorage();
    storage?.removeItem(STORAGE_KEY);
  },
};

function setAxiosAuthInterceptor(axiosClient) {
  const requestInterceptors = axiosClient?.interceptors?.request;
  if (!requestInterceptors?.use) return undefined;

  return requestInterceptors.use(config => {
    const token = authStorage.getJwtAuthParams()?.access;
    if (!token) return config;

    const headers = config.headers ?? {};

    return {
      ...config,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });
}

module.exports = {
  authStorage,
  setAxiosAuthInterceptor,
};
