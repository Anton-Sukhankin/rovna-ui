export const prepend = <T extends { children?: T[] }>(
  nodes: T[],
  payload: T,
  predicate: (value: T) => boolean,
): T[] => {
  return nodes.map(node => {
    if (predicate(node)) {
      return { ...node, children: [payload, ...(node.children || [])] };
    }

    if (!Array.isArray(node.children)) return node;

    return { ...node, children: prepend(node.children, payload, predicate) };
  });
};
