import { TreeData, TreeNode } from '@rovna-internal/tree/core';

export const useNodeType = <T extends TreeData>(node: TreeNode<T>) => {
  const isBranch = Array.isArray(node.children);
  const isLeaf = !Array.isArray(node.children);
  const isEmptyBranch = Array.isArray(node.children) && node.children.length === 0;

  return { isBranch, isLeaf, isEmptyBranch };
};
