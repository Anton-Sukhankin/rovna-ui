import React from 'react';
import AntDropdown, { DropDownProps as AntDropDownProps } from 'antd-core/es/dropdown';

type ContextMenuItemClickHandler = (information: {
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}) => void;

type ContextMenuItemType = {
  key: string;
  selectable?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onClick?: ContextMenuItemClickHandler;
};

type ContextMenuSubItemType<T extends ContextMenuItemType = ContextMenuItemType> = {
  key: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onClick?: ContextMenuItemClickHandler;
  children?: ContextMenuItem<T>[];
};

interface ContextMenuGroupItemType<T extends ContextMenuItemType = ContextMenuItemType> {
  key?: string;
  type: 'group';
  label?: React.ReactNode;
  children?: ContextMenuItem<T>[];
}

type ContextMenuDividerItemType = {
  key?: string;
  type: 'divider';
};

type ContextMenuItem<T extends ContextMenuItemType = ContextMenuItemType> =
  | T
  | ContextMenuDividerItemType
  | ContextMenuSubItemType<T>
  | ContextMenuGroupItemType<T>;

export const isContextMenuItem = (item: ContextMenuItem): item is ContextMenuItemType => {
  return 'selectable' in item;
};
export const isContextMenuDividerItem = (
  item: ContextMenuItem,
): item is ContextMenuDividerItemType => {
  return 'type' in item && item.type === 'divider';
};
export const isContextMenuGroupItem = (
  item: ContextMenuItem,
): item is ContextMenuGroupItemType => {
  return 'type' in item && item.type === 'group';
};
export const isContextSubMenuItem = (
  item: ContextMenuItem,
): item is ContextMenuSubItemType => {
  return !isContextMenuDividerItem(item) && !isContextMenuGroupItem(item);
};

export type DropdownRef = React.ElementRef<typeof AntDropdown>;
export type DropdownProps = Omit<AntDropDownProps, 'menu'> & {
  /**
   * @deprecated Низкоуровневое свойство
   * Используйте `items`, `onSelect`, `defaultSelectedKeys`, `selectedKeys`, `onClick` и тд
   */
  menu?: AntDropDownProps['menu'];
  content?: React.ReactNode;
  mode?: 'single' | 'multiple';
  items?: ContextMenuItem[];
  defaultSelectedKeys?: string[];
  selectedKeys?: string[];
  onSelect?: (keys: string[]) => void;
  onClick?: (path: string[]) => void;
};

export type {
  ContextMenuDividerItemType as DropdownDividerItemType,
  ContextMenuGroupItemType as DropdownGroupItemType,
  ContextMenuItem as DropdownItem,
  ContextMenuItemType as DropdownItemType,
  ContextMenuSubItemType as DropdownSubItemType,
};
