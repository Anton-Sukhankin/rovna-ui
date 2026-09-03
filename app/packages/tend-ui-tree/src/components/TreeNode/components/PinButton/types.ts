import { CellContext } from '@tanstack/react-table';

import { TreeData, TreeNode } from '@rovna-internal/tree/core';

export type PinButtonProps<T extends TreeData = TreeData> = {
  ['data-testid']?: string;
  context: CellContext<TreeNode<T>, string>;
};
