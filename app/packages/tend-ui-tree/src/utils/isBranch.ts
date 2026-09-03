import { TreeData, TreeNode } from '@rovna-internal/tree/core';

export const isBranch = <T extends TreeData = TreeData>(node: TreeNode<T>) =>
  Array.isArray(node.children);
