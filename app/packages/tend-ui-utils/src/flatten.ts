// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flatten = <T extends Record<string, any>>(items: T[], key = 'children'): T[] => {
  return items.flatMap(item => {
    if (key in item) {
      const k = key as keyof typeof item;

      return [item, ...flatten(item[k] || [], key)];
    }

    return item;
  });
};

export { flatten };
