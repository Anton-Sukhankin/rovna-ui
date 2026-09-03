import React from 'react';

export type SorterConfig = {
  /**
   * React.key
   */
  key?: React.Key;
  /**
   * Уникальный идентификатор сортировки
   * Сквозное свойство между сущностями `Table.ColumnType`,
   * `Table.FilterConfig`, `Table.SorterConfig`, `Table.CellTitle`
   */
  id: string;
  /**
   * Уникальное имя фильтра
   */
  name: string;
  /**
   * Лейбл в выпадающем меню в `Table.Toolbar`
   */
  label?: React.ReactNode;
  /**
   * Доступность поля
   */
  disabled?: boolean;
  /**
   * Вариант
   */
  variant?: 'default' | 'alphabetical' | 'novelty';
};
