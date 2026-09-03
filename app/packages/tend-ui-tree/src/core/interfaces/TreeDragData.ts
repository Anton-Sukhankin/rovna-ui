import { TreeData } from './TreeData';
import { TreeNode } from './TreeNode';

/**
 * @internal Не для публичного использования
 */
export interface TreeDragInfo<T extends TreeData = TreeData> {
  parent: TreeDragInfo<TreeNode<T>> | null;
  node: TreeNode<T>;
  depth: number;
  index: number;
}

/**
 * @internal Не для публичного использования
 */
export type TreeDragData<T extends TreeData = TreeData> = {
  current: TreeDragInfo<T>;
  previous: TreeDragInfo<T> | null;
  next: TreeDragInfo<T> | null;
  parent: TreeDragInfo<T> | null;
};
