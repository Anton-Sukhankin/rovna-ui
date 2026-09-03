export const splitArrayToText = <T>(array: Array<T>, splitIndex = 3) => {
  const head = array.slice(0, splitIndex);
  const tail = array.slice(splitIndex, array.length);

  const text = `${head.join(', ')}${tail.length > 0 ? `, +${tail.length}` : ''}`;

  return {
    text,
    head,
    tail,
  };
};
