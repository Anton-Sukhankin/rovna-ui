type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | PropertyName[];

declare function pick<T extends object, K extends keyof T>(
  object: T | null | undefined,
  paths: K | K[],
): Pick<T, K>;
declare function pick<T extends object>(
  object: T | null | undefined,
  paths: PropertyPath,
): Partial<T>;
declare function pick(object: unknown, paths: PropertyPath): Record<string, unknown>;

export = pick;
