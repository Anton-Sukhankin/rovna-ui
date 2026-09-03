/**
 * @description Утилита, позволяющая осуществлять рекурсивный поиск узла по дереву
 */
export const find = <T extends { children?: T[] }>(
  nodes: T[],
  predicate: (value: T) => boolean,
): T | undefined => {
  for (const child of nodes) {
    if (predicate(child)) {
      return child;
    }

    if (child.children) {
      const target = find(child.children, predicate);
      if (target) {
        return target;
      }
    }
  }

  return;
};
