type Entries<T> = {
  [K in keyof T]-?: [K, T[K]];
}[keyof T][];

export const entries = <T extends object>(value: T): Entries<T> =>
  Object.entries(value) as Entries<T>;
