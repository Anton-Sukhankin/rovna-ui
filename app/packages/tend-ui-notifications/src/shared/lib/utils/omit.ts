export function omit<T extends object, K extends keyof T>(
  obj: T,
  keysToOmit: K[],
): Omit<T, K> {
  const result = obj;

  keysToOmit.forEach(key => {
    delete result[key];
  });

  return result;
}
