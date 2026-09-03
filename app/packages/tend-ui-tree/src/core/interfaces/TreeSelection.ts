import { TreeData } from './TreeData';
import { TreeNode } from './TreeNode';

export interface TreeSelection<T extends TreeData = TreeData> {
  /**
   * Включить/выключить выделение по клику
   */
  selectable?: boolean;
  /**
   * Выбранный ключ по умолчанию
   */
  defaultSelectedKey?: string;
  /**
   * Выбранный ключ
   */
  selectedKey?: string;
  /**
   * Колбэк выбора узла через клик
   * Вызывается при клике на узел
   * @deprecated Используйте свойство `onSelect`
   */
  onClick?: (node: TreeNode<T>) => void;
  /**
   * Колбэк выбора узла через клик
   * Вызывается при клике на узел
   */
  onSelect?: (node: TreeNode<T>) => void;
  /**
   * Колбэк выбора узла через клик
   * Вызывается при клике на узел (даже если он уже выбран)
   */
  onNodeClick?: (node: TreeNode<T>) => void;
}
