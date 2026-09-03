import { TreeData } from '@rovna-internal/tree/core';
import { TreeDragInfo } from '@rovna-internal/tree/core/interfaces/TreeDragData';

export const computeBoundaries = <T extends TreeData = TreeData>(
  previous: TreeDragInfo<T> | null,
  next: TreeDragInfo<T> | null,
) => {
  const min = next ? next.depth : 0;
  const max = previous ? previous.depth + 1 : 0;

  return [min, max] as const;
};
