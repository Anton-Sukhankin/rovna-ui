export type TreeAutoExpand = 'onsearch';

export interface TreeExpanding {
  /**
   * Отображение кнопки раскрытия узла
   */
  /**
   * @deprecated В чем смысла дерева если его нельзя раскрывать?
   * TODO: Будет удалено в следующем мажоре
   * @default true
   */
  expandable?: boolean;
  /**
   * Свойство позволяет включать автоматическое раскрытие узлов
   * при определенных действиях
   */
  autoexpand?: TreeAutoExpand[];
}
