import { TreeData } from './TreeData';
import { TreePredicate } from './TreePredicate';

export interface TreeEditing<T extends TreeData = TreeData> {
  /**
   * Можно ли создать узел
   */
  canAddNode?: TreePredicate<T>;
  /**
   * Можно ли редактировать узел
   */
  canEditNode?: TreePredicate<T>;
  /**
   * Можно ли удалить узел
   */
  canRemoveNode?: TreePredicate<T>;
}
