export const append = <T extends { children?: T[] }>(
  nodes: T[],
  payload: T,
  predicate: (value: T) => boolean,
): T[] => {
  return nodes.map(node => {
    if (predicate(node)) {
      return { ...node, children: [...(node.children || []), payload] };
    }

    if (Array.isArray(node.children)) {
      return { ...node, children: append(node.children, payload, predicate) };
    }

    return node;
  });
};
