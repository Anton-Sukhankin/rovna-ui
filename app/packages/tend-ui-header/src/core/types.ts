import React from 'react';
import { CounterProps, DotProps } from '@rovna-ui/primitives';

type ContextMenuClickHandler = (information: {
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}) => void;

/**
 * @internal Не для публичного использования
 */
export type Counter = Pick<CounterProps, 'preset'> & {
  type: 'counter';
  inner: number;
};
/**
 * @internal Не для публичного использования
 */
export type Dot = Pick<DotProps, 'preset'> & {
  type: 'dot';
};

export type NavigationItemType = {
  key: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onClick?: ContextMenuClickHandler;
  badge?: Dot | Counter;
};

export type NavigationSubItemType = {
  key: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onClick?: ContextMenuClickHandler;
  children?: NavigationItem[];
  badge?: Dot | Counter;
};

export interface NavigationGroupItemType {
  key?: string;
  type: 'group';
  label?: React.ReactNode;
  onClick?: ContextMenuClickHandler;
  children?: NavigationItem[];
}

export interface NavigationDividerItemType {
  key?: string;
  type: 'divider';
}

export type NavigationItem =
  | NavigationItemType
  | NavigationSubItemType
  | NavigationGroupItemType
  | NavigationDividerItemType;

export type StackNavigationProps = {
  items: NavigationItem[];
  onSelect?: (path: string[]) => void;
};
