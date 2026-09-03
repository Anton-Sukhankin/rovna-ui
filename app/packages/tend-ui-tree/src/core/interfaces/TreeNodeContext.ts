/**
 * Фасад над контекстом tanstack
 * Соблюдаем инверсию зависимостей
 */
export interface TreeNodeContext<T> {
  getParentNode: () => TreeNodeContext<T> | undefined;
  node: T;
}
