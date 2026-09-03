export const swap = <T = unknown>(array: T[], from: number, to: number): T[] => {
  const isSame = from === to;
  const isNegative = from < 0 || to < 0;
  const isOutOfRange = from >= array.length || to >= array.length;

  if (isSame || isNegative || isOutOfRange) return array;

  return array.map((value, index, self) => {
    if (index === from) return self[to];
    if (index === to) return self[from];

    return value;
  });
};
