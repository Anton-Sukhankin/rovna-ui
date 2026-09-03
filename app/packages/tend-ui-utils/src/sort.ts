import { entries } from './entries';

export const sort = <T extends object = object>(
  value: T,
  comparator: (
    a: { [K in keyof T]-?: [K, T[K]] }[keyof T],
    b: { [K in keyof T]-?: [K, T[K]] }[keyof T],
  ) => number,
) => Object.fromEntries(entries(value).sort(comparator)) as T;
