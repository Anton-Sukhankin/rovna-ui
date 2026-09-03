import { TreeData, TreeNode } from '@rovna-internal/tree/core';

import { useNodeType } from './useNodeType';

export const useNodeActionsAllowance = <T extends TreeData>(node: TreeNode<T>) => {
  const { isBranch, isEmptyBranch, isLeaf } = useNodeType(node);
  const canCreateBranch = isBranch || isEmptyBranch;
  const canCreateLeaf = isBranch || isEmptyBranch;
  const canEditBranch = isBranch || isEmptyBranch;
  const canEditLeaf = isLeaf;
  const canDeleteBranch = isBranch || isEmptyBranch;
  const canDeleteLeaf = isLeaf;

  return {
    canCreateBranch,
    canCreateLeaf,
    canEditBranch,
    canEditLeaf,
    canDeleteBranch,
    canDeleteLeaf,
  };
};
