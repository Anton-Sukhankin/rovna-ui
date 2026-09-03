type ValueIteratee<T, R = unknown> = keyof T | ((value: T) => R);

declare function groupBy<T>(
  collection: T[] | null | undefined,
  iteratee?: ValueIteratee<T>,
): Record<string, T[]>;

export = groupBy;
