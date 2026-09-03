export const keys = <T extends object>(value: T) => Object.keys(value) as (keyof T)[];
