import React from 'react';

export interface ColumnConfig {
  /**
   * Уникальный `id` колонки
   */
  id: string;
  /**
   * `React.Key`
   */
  key?: React.Key;
  /**
   * Label колонки в `DrawerColumnsSettings`
   */
  label?: string;
  /**
   * Заголовок колонки в `DrawerColumnsSettings`
   */
  title?: React.ReactNode;
  /**
   * Отображение колонки
   * @default true
   */
  visible?: boolean;
  /**
   * Может ли колонка быть закреплена
   * @default true
   */
  pinnable?: boolean;
  /**
   * Можно ли выключать колонку
   * @default false
   */
  disabled?: boolean;
  /**
   * Можно ли перетаскивать колонку
   * @default true
   */
  draggable?: boolean;
  /**
   * Игнорировать ли колонку в управлении
   * @default false
   */
  ignored?: boolean;
  /**
   * Закрепление колонки
   * @default undefined
   */
  fixed?: 'left' | 'right' | 'none';
}
