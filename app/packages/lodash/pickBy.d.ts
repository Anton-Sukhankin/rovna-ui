type ObjectPredicate<T extends object> = (value: T[keyof T], key: string) => boolean;

declare function pickBy<T extends object>(
  object: T | null | undefined,
  predicate?: ObjectPredicate<T>,
): Partial<T>;

export = pickBy;
