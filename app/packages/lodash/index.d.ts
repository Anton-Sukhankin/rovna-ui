export type PropertyName = string | number | symbol;
export type PropertyPath = PropertyName | PropertyName[];
export type ValueIteratee<T, R = unknown> = keyof T | ((value: T) => R);
export type ObjectValueIteratee<T, R> = (value: T[keyof T], key: string, object: T) => R;
export type ObjectPredicate<T extends object> = (
  value: T[keyof T],
  key: string,
) => boolean;

export declare function chunk<T>(array: T[] | null | undefined, size?: number): T[][];

export declare function camelCase(value?: unknown): string;

export declare function cloneDeep<T>(value: T): T;
export declare function countBy<T>(
  collection: T[] | Record<string, T> | null | undefined,
  iteratee?: ValueIteratee<T>,
): Record<string, number>;
export declare function isFunction(value: unknown): value is (...args: any[]) => any;
export declare function isPlainObject(
  value: unknown,
): value is Record<PropertyKey, unknown>;
export declare function kebabCase(value?: unknown): string;
export declare function mapKeys<T extends object>(
  object: T | null | undefined,
  iteratee?: (value: T[keyof T], key: string, object: T) => PropertyKey,
): Record<PropertyKey, T[keyof T]>;
export declare function mergeWith<T extends object>(object: T, ...sources: any[]): T;
export declare function startCase(value?: unknown): string;
export declare function throttle<T extends (...args: any[]) => any>(
  fn: T,
  wait?: number,
  options?: { leading?: boolean; trailing?: boolean },
): DebouncedFunction<T>;
export declare function upperFirst(value?: unknown): string;

export declare function uniq<T>(array: T[] | null | undefined): T[];

export declare function groupBy<T>(
  collection: T[] | null | undefined,
  iteratee?: ValueIteratee<T>,
): Record<string, T[]>;

export declare function mapValues<T extends object, R>(
  object: T | null | undefined,
  iteratee: ObjectValueIteratee<T, R>,
): Record<keyof T, R>;
export declare function mapValues<T extends object>(
  object: T | null | undefined,
): Partial<T>;

export declare function pickBy<T extends object>(
  object: T | null | undefined,
  predicate?: ObjectPredicate<T>,
): Partial<T>;

export declare function omitBy<T extends object>(
  object: T | null | undefined,
  predicate?: ObjectPredicate<T>,
): Partial<T>;

export declare function isEmpty(value: unknown): boolean;

export declare function uniqBy<T>(
  array: T[] | null | undefined,
  iteratee?: ValueIteratee<T>,
): T[];

export type DebouncedFunction<T extends (...args: any[]) => any> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) & {
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
};

export declare function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait?: number,
  options?: {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
  },
): DebouncedFunction<T>;

export declare function merge<TObject, TSource>(
  object: TObject,
  source: TSource,
): TObject & TSource;
export declare function merge<TObject, TSource1, TSource2>(
  object: TObject,
  source1: TSource1,
  source2: TSource2,
): TObject & TSource1 & TSource2;
export declare function merge(object: any, ...sources: any[]): any;

export declare function isEqual(left: unknown, right: unknown): boolean;

export declare function identity<T>(value: T): T;

export declare function isNil(value: unknown): value is null | undefined;

export declare function isString(value: unknown): value is string;

export declare function omit<T extends object, K extends keyof T>(
  object: T | null | undefined,
  paths: K | K[],
): Omit<T, K>;
export declare function omit<T extends object>(
  object: T | null | undefined,
  paths: PropertyPath,
): Partial<T>;
export declare function omit(object: unknown, paths: PropertyPath): Record<string, unknown>;

export declare function pick<T extends object, K extends keyof T>(
  object: T | null | undefined,
  paths: K | K[],
): Pick<T, K>;
export declare function pick<T extends object>(
  object: T | null | undefined,
  paths: PropertyPath,
): Partial<T>;
export declare function pick(object: unknown, paths: PropertyPath): Record<string, unknown>;

declare const lodash: {
  camelCase: typeof camelCase;
  chunk: typeof chunk;
  cloneDeep: typeof cloneDeep;
  countBy: typeof countBy;
  debounce: typeof debounce;
  groupBy: typeof groupBy;
  identity: typeof identity;
  isEqual: typeof isEqual;
  isEmpty: typeof isEmpty;
  isFunction: typeof isFunction;
  isNil: typeof isNil;
  isPlainObject: typeof isPlainObject;
  isString: typeof isString;
  kebabCase: typeof kebabCase;
  mapKeys: typeof mapKeys;
  mapValues: typeof mapValues;
  merge: typeof merge;
  mergeWith: typeof mergeWith;
  omit: typeof omit;
  omitBy: typeof omitBy;
  pick: typeof pick;
  pickBy: typeof pickBy;
  startCase: typeof startCase;
  throttle: typeof throttle;
  uniq: typeof uniq;
  uniqBy: typeof uniqBy;
  upperFirst: typeof upperFirst;
};

export default lodash;
