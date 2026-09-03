type ValueIteratee<T, R = unknown> = keyof T | ((value: T) => R);

declare function uniqBy<T>(array: T[] | null | undefined, iteratee?: ValueIteratee<T>): T[];

export = uniqBy;
