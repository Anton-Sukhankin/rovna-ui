declare function mergeWith<T extends object>(
  object: T,
  ...sources: Array<object | ((objectValue: unknown, sourceValue: unknown, key: string) => unknown)>
): T;

export = mergeWith;
