import { TreeData } from './TreeData';
import { TreeNode } from './TreeNode';
import { TreePredicate } from './TreePredicate';

interface Information<T extends TreeData = TreeData> {
  parent: TreeNode<T> | 'root';
}
interface DragInformation<T extends TreeData = TreeData> {
  grabbed: TreeNode<T>[];
  from: Information<T>;
  to: Information<T>;
}

export interface TreeDragging<T extends TreeData = TreeData> {
  /**
   * Включает/выключает `drag and drop`
   */
  draggable?: boolean;
  /**
   * Можно ли перетаскивать ЭТОТ узел
   */
  canDragNode?: TreePredicate<T>;
  /**
   * Можно ли перетаскивать В этот узел
   */
  canDropNode?: TreePredicate<T>;
  /**
   * Вызывается при завершении перемещения узла
   */
  onNodeDragEnd?: (information: DragInformation<T>) => void;
}
