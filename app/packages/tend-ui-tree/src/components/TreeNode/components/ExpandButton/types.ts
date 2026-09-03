import { CellContext } from '@tanstack/react-table';

import { TreeData, TreeNode } from '@rovna-internal/tree/core';

export type ExpandButtonProps<T extends TreeData = TreeData> = {
  context: CellContext<TreeNode<T>, string>;
  onNodeExpand?: (node: TreeNode<T>) => void;
};
