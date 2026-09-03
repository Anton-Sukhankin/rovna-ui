import React from 'react';

export interface BurgerMenuItemType {
  key: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
}

export interface BurgerMenuGroupItemType {
  key: string;
  type: 'group';
  label: React.ReactNode;
  children?: BurgerMenuItemType[];
}

export interface BurgerMenuDividerItemType {
  key?: string;
  type: 'divider';
}

export type BurgerMenuItem =
  | BurgerMenuItemType
  | BurgerMenuDividerItemType
  | BurgerMenuGroupItemType;

export type BurgerMenuProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (payload: boolean) => void;
  error?: boolean;
  loading?: boolean;
  disabled?: boolean;
  mode?: 'single' | 'multiple' | 'none';
  defaultSelectedKeys?: string[];
  selectedKeys?: string[];
  header?: React.ReactNode;
  items: BurgerMenuItem[];
  onSelect?: (keys: string[]) => void;
  portionSize?: number;
  preloaderVariant?: 'samolet' | 'global';
};
