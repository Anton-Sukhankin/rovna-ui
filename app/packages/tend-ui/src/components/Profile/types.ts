import React from 'react';

import { AvatarProps } from '@rovna-internal/components/primitives/Avatar';
import { DropdownItemType } from '@rovna-internal/components/primitives/Dropdown';

export type ProfileMenuItemType = DropdownItemType;
export type ProfileMenuSubItemType<T extends ProfileMenuItemType = ProfileMenuItemType> =
  {
    key: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    label?: React.ReactNode;
    onClick?: () => void;
    children?: ProfileMenuItem<T>[];
  };

export interface ProfileMenuGroupItemType<
  T extends ProfileMenuItemType = ProfileMenuItemType,
> {
  key?: string;
  type: 'group';
  label?: React.ReactNode;
  children?: ProfileMenuItem<T>[];
}

export type ProfileMenuDividerItemType = {
  key?: string;
  type: 'divider';
};

export type ProfileMenuItem<T extends ProfileMenuItemType = ProfileMenuItemType> =
  | T
  | ProfileMenuDividerItemType
  | ProfileMenuSubItemType<T>
  | ProfileMenuGroupItemType<T>;

/**
 * @deprecated  Используйте интерфейс `ProfileMenuItem`
 */
export type ProfileItem = ProfileMenuItem;

export type ProfileProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  avatar?: Omit<AvatarProps, 'size'>;
  items?: ProfileMenuItem[];
};
