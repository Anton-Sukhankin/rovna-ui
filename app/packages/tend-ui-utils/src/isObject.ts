export const isObject = <T extends object = object>(value: unknown): value is T => {
  const type = typeof value;

  return value !== null && (type == 'object' || type == 'function');
};
