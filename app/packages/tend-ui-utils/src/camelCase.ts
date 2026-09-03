export const camelCase = (value: string) =>
  value.replace(/-./g, ([, x]) => x.toUpperCase());
