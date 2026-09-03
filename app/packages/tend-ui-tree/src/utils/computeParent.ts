import { TreeData, TreeNode } from '@rovna-internal/tree/core';
import { TreeDragInfo } from '@rovna-internal/tree/core/interfaces/TreeDragData';

import { up } from './up';

/**
 * Рассчитывает нового родителя перетаскиваемого элемента
 * на основе предыдущего соседа и глубины, на которой
 * элемент расположен
 */
export const computeParent = <T extends TreeData = TreeData>(
  depth: number,
  previous: TreeDragInfo<T> | null,
): TreeNode<T> | null => {
  /**
   * Если предыдущего элемента нет, значит мы подняли узел
   * в самый корень дерева
   */
  if (!previous) return null;
  /**
   * Если глубина равна глубине предыдущего элемента, значит мы перетаскиваем
   * узел в рамках одной ветки, берем родителя предыдущего узла
   */
  if (depth === previous.depth) return previous.parent ? previous.parent.node : null;
  /**
   * Если глубина больше глубины предыдущего элемента, значит мы вкладываем
   * узел в другой (двигаем мышкой вправо), предыдущий узел становится новым родителем
   * для перетаскиваемого
   */
  if (depth > previous.depth) return previous.node;
  /**
   * Если глубина меньше глубины предыдущего элемента, значит поднимаем
   * узел из нижних веток в верхние (двигаем мышкой влево),
   * нового родителя необходимо рекурсивно рассчитать.
   * Высчитываем разницу глубины между предыдущем элементов и
   * начинаем рекурсивно искать нужного родителя до нужной вложенности
   * difference
   */
  if (depth < previous.depth) {
    const difference = previous.depth - depth;
    const parent = up(previous.parent, difference);

    return parent ? parent.node : null;
  }

  return null;
};
