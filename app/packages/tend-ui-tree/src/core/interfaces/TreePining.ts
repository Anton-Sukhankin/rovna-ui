import { TreeData } from './TreeData';
import { TreePredicate } from './TreePredicate';
export interface TreePinning<T extends TreeData = TreeData> {
  /**
   * Отображение кнопки закрепления узла
   */
  pinnable?: boolean;
  /**
   * Может ли узел быть закреплен
   *
   * Используйте свойство если вам нужно настроить правило отображение
   * иконки закрепления для каждого узла индивидуально
   */
  canPinNode?: TreePredicate<T>;
}
