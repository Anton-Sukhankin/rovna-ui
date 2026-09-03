import { afterAll } from 'vitest';

const restoreNetworkGuard = installNetworkGuard();
const restoreReact17ActWarnings = installReact17ActWarningFilter();

afterAll(() => {
  restoreReact17ActWarnings();
  restoreNetworkGuard();
});

function installReact17ActWarningFilter() {
  const originalError = console.error;
  const ignoredPrefixes = [
    'Warning: Do not await the result of calling act(...) with sync logic, it is not a Promise.',
    'Warning: The callback passed to act(...) function must return undefined, or a Promise. You returned ',
  ];

  console.error = (...args: unknown[]) => {
    const [message] = args;
    const isStorybookReact17ActWarning =
      typeof message === 'string' && ignoredPrefixes.some(prefix => message.startsWith(prefix));

    if (!isStorybookReact17ActWarning) originalError(...args);
  };

  return () => {
    console.error = originalError;
  };
}

function installNetworkGuard() {
  const originalFetch = globalThis.fetch;
  const originalXhrOpen = globalThis.XMLHttpRequest?.prototype.open;
  const originalWebSocket = globalThis.WebSocket;
  const originalEventSource = globalThis.EventSource;

  const assertLocal = (value: string | URL) => {
    const url = new URL(String(value), globalThis.location.origin);
    if (
      url.origin === globalThis.location.origin ||
      url.protocol === 'data:' ||
      url.protocol === 'blob:'
    )
      return;

    throw new Error(`Storybook browser tests blocked an external request: ${url.href}`);
  };

  if (originalFetch) {
    globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
      assertLocal(input instanceof Request ? input.url : input);
      return originalFetch(input, init);
    }) as typeof fetch;
  }

  if (originalXhrOpen) {
    globalThis.XMLHttpRequest.prototype.open = function guardedOpen(
      method: string,
      url: string | URL,
      async = true,
      username?: string | null,
      password?: string | null,
    ) {
      assertLocal(url);
      return originalXhrOpen.call(this, method, String(url), async, username, password);
    };
  }

  if (originalWebSocket) {
    globalThis.WebSocket = new Proxy(originalWebSocket, {
      construct(target, argumentsList) {
        assertLocal(argumentsList[0]);
        return Reflect.construct(target, argumentsList);
      },
    });
  }

  if (originalEventSource) {
    globalThis.EventSource = new Proxy(originalEventSource, {
      construct(target, argumentsList) {
        assertLocal(argumentsList[0]);
        return Reflect.construct(target, argumentsList);
      },
    });
  }

  return () => {
    if (originalFetch) globalThis.fetch = originalFetch;
    if (originalXhrOpen) globalThis.XMLHttpRequest.prototype.open = originalXhrOpen;
    if (originalWebSocket) globalThis.WebSocket = originalWebSocket;
    if (originalEventSource) globalThis.EventSource = originalEventSource;
  };
}
