import React from 'react';
import { MenuRef as AntMenuRef } from 'antd-core/es/menu';
import {
  MenuDividerType as AntMenuDividerType,
  MenuItemGroupType as AntMenuItemGroupType,
  MenuItemType as AntMenuItemType,
  SubMenuType as AntSubMenuType,
} from 'antd-core/es/menu/hooks/useItems';

import { BadgeProps } from '@rovna-internal/components/primitives/Badge';

/**
 * @internal Не для публичного использования
 */
type Counter = Pick<BadgeProps, 'max' | 'preset'> & {
  type: 'counter';
  inner: number;
};
/**
 * @internal Не для публичного использования
 */
type Dot = Pick<BadgeProps, 'preset'> & {
  type: 'dot';
  preset?: BadgeProps['preset'];
};
/**
 * @internal Не для публичного использования
 */
export type BadgeType = Counter | Dot;
// Берем только нужные свойства так как потенциально
// придется переписывать меню на свое и тогда мы не сможем
// поддерживать все свойства antd
export type MenuDividerType = Pick<AntMenuDividerType, 'key' | 'type'>;
// Берем только нужные свойства так как потенциально
// придется переписывать меню на свое и тогда мы не сможем
// поддерживать все свойства antd
export interface MenuType extends Pick<AntMenuItemType, 'key' | 'label' | 'disabled'> {
  badge?: Counter | Dot;
}
// Берем только нужные свойства так как потенциально
// придется переписывать меню на свое и тогда мы не сможем
// поддерживать все свойства antd
export interface SubMenuType<T extends MenuType = MenuType>
  extends Pick<AntSubMenuType<T>, 'key' | 'label' | 'children' | 'disabled'> {
  badge?: Counter | Dot;
}
// Берем только нужные свойства так как потенциально
// придется переписывать меню на свое и тогда мы не сможем
// поддерживать все свойства antd
export type MenuGroupType<T extends MenuType = MenuType> = Pick<
  AntMenuItemGroupType<T>,
  'key' | 'label' | 'children' | 'type'
>;
export type MenuItemType<T extends MenuType = MenuType> =
  | T
  | SubMenuType<T>
  | MenuGroupType<T>
  | MenuDividerType
  | null;
export type MenuRef = AntMenuRef;

// Берем только нужные свойства так как потенциально
// придется переписывать меню на свое и тогда мы не сможем
// поддерживать все свойства antd
export interface MenuProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onClick' | 'onSelect' | 'dir'> {
  trigger?: 'hover' | 'click';
  items?: MenuItemType[];
  disabled?: boolean;
  activeKey?: string;
  openKeys?: string[];
  selectedKeys?: string[];
  defaultOpenKeys?: string[];
  defaultSelectedKeys?: string[];
  onClick?: (information: { key: string; keyPath: string[] }) => void;
}
