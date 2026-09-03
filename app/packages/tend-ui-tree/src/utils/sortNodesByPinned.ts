import { TreeData, TreeNode } from '../core/interfaces';

export const sortNodesByPinned = <T extends TreeData>(
  nodes: TreeNode<T>[] | undefined,
  pinnedNodesKeys: string[],
  sortBy?: keyof T,
): TreeNode<T>[] | undefined => {
  if (!nodes) return nodes;

  const pinnedNodesKeysSet = new Set(pinnedNodesKeys);

  const nodesWithKeys = [];
  const nodesWithoutKeys = [];

  for (const obj of nodes) {
    if (pinnedNodesKeysSet.has(obj.key)) {
      nodesWithKeys.push(obj);
    } else {
      nodesWithoutKeys.push(obj);
    }
  }

  nodesWithKeys.sort(
    (a, b) => pinnedNodesKeys.indexOf(a.key) - pinnedNodesKeys.indexOf(b.key),
  );

  // Сортировка незакрепленных узлов с учетом sortBy
  if (sortBy) {
    nodesWithoutKeys.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }

      return 0;
    });
  } else {
    nodesWithoutKeys.sort((a, b) => a.key.localeCompare(b.key));
  }

  return nodesWithKeys.concat(nodesWithoutKeys);
};
