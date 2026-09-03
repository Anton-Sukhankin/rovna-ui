declare function mapKeys<T extends object>(
  object: T | null | undefined,
  iteratee?: (value: T[keyof T], key: string, object: T) => PropertyKey,
): Record<PropertyKey, T[keyof T]>;

export = mapKeys;
