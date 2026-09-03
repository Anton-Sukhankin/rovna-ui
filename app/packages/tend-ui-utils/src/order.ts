// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const order = <T extends Record<string, any>>(
  array: T[],
  ordering: string[],
  key: string,
) => {
  if (!ordering.length) return array;

  return array
    .slice()
    .sort((a, b) => ordering.indexOf(a[key]) - ordering.indexOf(b[key]));
};
