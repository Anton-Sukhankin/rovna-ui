/**
 * @description Утилита, позволяющая осуществлять проход по дереву с фильтрацией по заданным ключам
 */
export function filter<T extends { children?: T[] }>(
  nodes: T[],
  predicate: (value: T) => boolean,
): T[] {
  return nodes
    .map(node => {
      if (!Array.isArray(node.children)) return node;

      return {
        ...node,
        children: filter(node.children, predicate),
      };
    })
    .filter(predicate);
}
