type AnyObject = Record<string, unknown>;

export function mergeArraysObjectsByKey<T extends AnyObject, K>(
  arr1: T[],
  arr2: K[],
  key: keyof (T | K),
): (T & K)[] {
  const map = new Map<unknown, T & K>();

  const mergeObjects = (obj1: T, obj2: K): T & K => {
    return { ...obj1, ...obj2 };
  };

  arr1.forEach(item => {
    map.set(item[key], item as T & K);
  });

  arr2.forEach(item => {
    if (map.has(item[key])) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      map.set(item[key], mergeObjects(map.get(item[key])!, item));
    }
  });

  return Array.from(map.values());
}
