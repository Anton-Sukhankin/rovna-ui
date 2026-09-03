declare function countBy<T>(
  collection: T[] | Record<string, T> | null | undefined,
  iteratee?: keyof T | ((value: T) => unknown),
): Record<string, number>;

export = countBy;
