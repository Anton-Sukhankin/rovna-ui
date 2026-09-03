export const createScopedConfig =
  (scope: string) =>
  <T extends { name: string | string[] }>(config: T): T => {
    return {
      ...config,
      name: Array.isArray(config.name) ? [scope, ...config.name] : [scope, config.name],
    };
  };
