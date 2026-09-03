/**
 * Вставка узла в массив по индексу
 */
export const position = <T>(array: T[], value: T, position: number): T[] => {
  if (position < 0) return array;

  return [...array.slice(0, position), value, ...array.slice(position)];
};
