export const getEnv = () => {
  const { host } = window.location;

  const isStage =
    host.includes('-stage') ||
    host.includes('mr-') ||
    host.includes('-e2e') ||
    host.includes('-dev');
  const isLocalhost = ['localhost', '127.0.0.1'].some(e => host.includes(e));
  const isProd = !isStage && !isLocalhost;

  return {
    isStage,
    isLocalhost,
    isProd,
  };
};
