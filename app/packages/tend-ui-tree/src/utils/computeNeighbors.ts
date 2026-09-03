import { TreeData, TreeDragData } from '@rovna-internal/tree/core';

export const computeNeighbors = <T extends TreeData = TreeData>(
  dragged: TreeDragData<T>,
  overed: TreeDragData<T>,
  y: number,
) => {
  const isSamePosition = dragged.current.node.key === overed.current.node.key;
  const isMovingUp = y < 0;

  /**
   * Вернулись на прежнее место
   */
  if (isSamePosition) {
    const previous = overed.previous;
    const next = overed.next;

    return [previous, next] as const;
  }

  /**
   * Если движемся вверх по дереву
   */
  if (isMovingUp) {
    const previous = overed.previous;
    const next = overed.current;

    return [previous, next] as const;
  }

  /**
   * Движемся вниз по дереву
   */
  const previous = overed.current;
  const next = overed.next;

  return [previous, next] as const;
};
