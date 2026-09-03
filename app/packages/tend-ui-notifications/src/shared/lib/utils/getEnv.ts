export const getEnv = () => {
  const { host } = window.location;

  const isStage =
    host.includes('-stage') ||
    host.includes('-dev') ||
    host.includes('mr-') ||
    host.includes('-e2e') ||
    /stg\d+/.test(host);

  const isLocalhost = ['localhost', '127.0.0.1'].some(e => host.includes(e));
  const isProd = !isStage && !isLocalhost;

  return {
    isStage,
    isLocalhost,
    isProd,
  };
};
