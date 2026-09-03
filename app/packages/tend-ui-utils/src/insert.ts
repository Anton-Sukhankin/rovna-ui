export const insert = <T>(array: T[], value: T, predicate: (value: T) => boolean) => {
  const finding = array.find(predicate);
  if (!finding) return array;
  const index = array.findIndex(predicate);
  if (index === -1) return array;

  return [...array.slice(0, index + 1), value, ...array.slice(index + 1)];
};
