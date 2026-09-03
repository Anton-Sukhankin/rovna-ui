import { Row } from '@tanstack/react-table';

import { TreeData, TreeDragData, TreeNode } from '@rovna-internal/tree/core';
import { TreePredicate } from '@rovna-internal/tree/core/interfaces/TreePredicate';

export type TreeRowProps<T extends TreeData> = {
  draggable?: boolean;

  grabbed: TreeDragData<T> | null;
  depth: number;

  row: Row<TreeNode<T>>;
  previous: Row<TreeNode<T>> | null;
  next: Row<TreeNode<T>> | null;
  canDragNode: TreePredicate<T>;

  onClick?: (node: TreeNode<T>) => void;
  onNodeExpand?: (node: TreeNode<T>) => void;
  canExpandNode?: TreePredicate<T>;
};
