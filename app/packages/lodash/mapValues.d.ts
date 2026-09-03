type ObjectValueIteratee<T extends object, R> = (
  value: T[keyof T],
  key: string,
  object: T,
) => R;

declare function mapValues<T extends object, R>(
  object: T | null | undefined,
  iteratee: ObjectValueIteratee<T, R>,
): Record<keyof T, R>;
declare function mapValues<T extends object>(object: T | null | undefined): Partial<T>;

export = mapValues;
