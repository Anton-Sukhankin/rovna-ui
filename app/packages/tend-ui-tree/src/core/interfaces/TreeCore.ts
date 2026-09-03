import React from 'react';
import { ButtonProps } from '@rovna-ui/primitives';

import { TreeData } from './TreeData';
import { TreeNode } from './TreeNode';
import { TreePredicate } from './TreePredicate';

export interface TreeCore<T extends TreeData = TreeData> {
  /**
   * Отвечает за отображение кнопки фильтров
   */
  showFiltersButton?: boolean;
  /**
   * Плейсхолдер для строки поиска
   */
  placeholder?: string;
  /**
   * Свойства кнопки фильтров
   */
  filtersButtonProps?: Pick<ButtonProps<'button'>, 'onClick'>;
  /**
   * Уникальный ключ `localStorage`. Нужен для сохранения состояния раскрытия и закрепления строк
   */
  localStorage?: string;
  /**
   * Управлением переносом текста
   */
  ellipsis?: boolean;
  /**
   * Состояние загрузки
   */
  loading?: boolean;
  /**
   * Отображение поисковой строки
   */
  deletable?: boolean;
  /**
   * Отображение поисковой строки
   */
  searchable?: boolean;
  /**
   * Узлы дерева
   */
  nodes?: TreeNode<T>[];
  /**
   * Узлы дерева по умолчанию
   */
  defaultNodes?: TreeNode<T>[];
  /**
   * Колбэк изменения дерева
   * Вызывается при добавлении, удалении, редактировании узлов
   */
  onChange?: (nodes: TreeNode<T>[]) => void;

  /**
   * Ключи отмеченных узлов
   */
  checkedKeys?: string[];
  /**
   * Ключи отмеченных узлов по умолчанию
   */
  defaultCheckedKeys?: string[];
  /**
   * Колбэк изменения отмеченных узлов
   * Вызывается при изменении отмеченных узлов
   */
  onCheck?: (keys: string[]) => void;

  /**
   * Ключи раскрытых узлов
   */
  expandedKeys?: string[];
  /**
   * Ключи раскрытых узлов по умолчанию
   */
  defaultExpandedKeys?: string[];
  /**
   * Колбэк изменения раскрытых узлов
   * Вызывается при изменении раскрытых узлов
   */
  onExpand?: (keys: string[]) => void;
  /**
   * Вызывается при раскрытии конкретного узла
   */
  onNodeExpand?: (node: TreeNode<T>) => void;

  pinnedKeys?: string[];
  defaultPinnedKeys?: string[];
  onPin?: (keys: string[]) => void;

  /**
   * Вызывается при поиске
   */
  onSearch?: (search: string) => void;

  /**
   * Колбэк создания узла
   * Вызывается при создании
   */
  onAdd?: (added: TreeNode<T>) => void;
  /**
   * Колбэк удаления узла
   * Вызывается при удалении
   */
  onRemove?: (removed: TreeNode<T>) => void;
  /**
   * Колбэк редактирования узла
   * Вызывается при редактировании узла
   */
  onEdit?: (updated: TreeNode<T>) => void;
  /**
   * Колбэк, возвращающий `ReactNode`
   *
   *
   * Используйте это свойство если вам нужно закастомизировать
   * иконку рядом с `value`
   */
  getNodeBefore?: (node: TreeNode<T>) => React.ReactNode;
  /**
   * Вызывается при скроллинге дерева
   */
  onScroll?: React.UIEventHandler<HTMLElement>;

  /**
   * Подвал
   */
  footer?: React.ReactNode;

  /**
   * Каунтер в узле
   */
  getNodeCounter?: (node: TreeNode<T>) => number;

  /**
   * Иконка после значения узла
   */
  getNodeIconAfter?: (node: TreeNode<T>) => React.ReactNode;

  /**
   * Свойство отвечает за то, какую иконку папки
   * (пустую или нет) отображать для ветки
   * Используйте это свойство если вам нужно
   * переопределить правило отображения иконки
   *
   * @default
   * ```
   * (node) => Array.isArray(node.children) && node.children.length > 0;
   * ```
   *
   */
  canExpandNode?: TreePredicate<T>;

  /**
   * Название поля ноды дерева, по которому ноды будут сортироваться
   */
  nodeFieldToSortBy?: keyof T;
}
