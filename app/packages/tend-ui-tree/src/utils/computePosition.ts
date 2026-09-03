import { TreeData, TreeNode } from '@rovna-internal/tree/core';
import { TreeDragInfo } from '@rovna-internal/tree/core/interfaces/TreeDragData';

import { up } from './up';

const FIRST_POSITION = 0;

/**
 * Рассчитывает позицию (index) перетаскиваемого элемента
 * в новом месте
 */
export const computePosition = <T extends TreeData = TreeData>(
  depth: number,
  previous: TreeDragInfo<T> | null,
  previousParent: TreeNode<T> | null,
  nextParent: TreeNode<T> | null,
  y: number,
) => {
  if (!previous) return FIRST_POSITION;
  if (previous.depth === depth) {
    const isMovingUp = y < 0;
    const isParentChange = previousParent?.key !== nextParent?.key;

    if (isMovingUp || isParentChange) return previous.index + 1;

    return previous.index;
  }
  if (depth > previous.depth) return FIRST_POSITION;
  if (depth < previous.depth) {
    const difference = previous.depth - depth;
    const parent = up(previous.parent, difference);

    return parent ? parent.index + 1 : FIRST_POSITION;
  }

  return 0;
};
