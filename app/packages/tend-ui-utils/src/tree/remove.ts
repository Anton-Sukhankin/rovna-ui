/**
 * @description Утилита, позволяющая осуществлять удаление узла из дерева
 */
export const remove = <T extends { children?: T[] }>(
  nodes: T[],
  predicate: (value: T) => boolean,
): T[] => {
  const copy = [...nodes];
  let isRemoved = false;

  function traverse(value: T[]) {
    if (isRemoved) return;

    value.forEach((v, i) => {
      if (predicate(v)) {
        value.splice(i, 1);
        isRemoved = true;

        return;
      }

      if (!Array.isArray(v.children)) return;

      traverse(v.children);
    });
  }

  traverse(copy);

  return copy;
};
