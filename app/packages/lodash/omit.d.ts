type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | PropertyName[];

declare function omit<T extends object, K extends keyof T>(
  object: T | null | undefined,
  paths: K | K[],
): Omit<T, K>;
declare function omit<T extends object>(
  object: T | null | undefined,
  paths: PropertyPath,
): Partial<T>;
declare function omit(object: unknown, paths: PropertyPath): Record<string, unknown>;

export = omit;
