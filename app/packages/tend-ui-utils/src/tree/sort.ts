export const sort = <T extends { children?: T[] }>(
  nodes: T[],
  comparator: (a: T, b: T) => number,
): T[] => {
  return nodes
    .map(node => {
      if (!Array.isArray(node.children)) return node;

      return {
        ...node,
        children: sort(node.children, comparator),
      };
    })
    .sort(comparator);
};
