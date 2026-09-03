export const kebabCase = (value: string) =>
  value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
