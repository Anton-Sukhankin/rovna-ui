export const move = <T = unknown>(array: T[], from: number, to: number): T[] => {
  const isSame = from === to;
  const isNegative = from < 0 || to < 0;
  const isOutOfRange = from >= array.length || to >= array.length;

  if (isSame || isNegative || isOutOfRange) return array;

  const target = array[from];
  const copy = [...array];
  copy.splice(from, 1);
  copy.splice(to, 0, target);

  return copy;
};
