import React from 'react';

/**
 * Интерфейс колонки
 */
export type ColumnConfig = {
  /**
   * `React.key`
   */
  key?: React.Key;
  /**
   * Уникальный `id` колонки
   */
  id: string;
  /**
   * @deprecated Используйте `label` instead
   */
  title?: React.ReactNode;
  /**
   * Лейбл в списке настроек колонок
   */
  label?: string;
  /**
   * Видимость
   * @default true
   */
  visible?: boolean;
  /**
   * Недоступность
   * @default  false
   */
  disabled?: boolean;
  /**
   * Можно ли закреплять колонку
   * @default true
   */
  pinnable?: boolean;
  /**
   * Можно ли перетаскивать колонку
   * @default true
   */
  draggable?: boolean;
  /**
   * Позиция закрепления (слева/справа)
   * @default undefined
   */
  fixed?: 'left' | 'right';
};
