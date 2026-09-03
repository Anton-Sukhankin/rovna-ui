/**
 * @description Утилита, позволяющая осуществлять патч узла по дереву
 */
export const edit = <T extends { children?: T[] }>(
  nodes: T[],
  payload: T,
  predicate: (value: T) => boolean,
): T[] => {
  return nodes.map(node => {
    if (predicate(node)) {
      const patched: T = { ...node, ...payload };

      return patched;
    }

    if (!Array.isArray(node.children)) return node;

    return { ...node, children: edit(node.children, payload, predicate) };
  });
};
