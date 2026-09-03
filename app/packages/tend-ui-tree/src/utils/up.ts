import { TreeData } from '@rovna-internal/tree/core';
import { TreeDragInfo } from '@rovna-internal/tree/core/interfaces/TreeDragData';

/**
 * Функция позволяет рекурсивно пройти по инстансам
 * `Row` за `depth` шагов и вернуть инстанс родительского `Row`
 */
export const up = <T extends TreeData = TreeData>(
  row: TreeDragInfo<T> | null,
  depth: number,
): TreeDragInfo<T> | null => {
  if (!row || depth === 0) return row;

  return up(row.parent, depth - 1);
};
