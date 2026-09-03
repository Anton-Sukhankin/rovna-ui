import React from 'react';

import { CounterProps } from '../Counter';
import { DotProps } from '../Dot';

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

export type StackNavigationItemType = {
  key: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onClick?: ContextMenuClickHandler;
  badge?: Dot | Counter;
};

export type StackNavigationSubItemType = {
  key: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onClick?: ContextMenuClickHandler;
  children?: StackNavigationItem[];
  badge?: Dot | Counter;
};

export interface StackNavigationGroupItemType {
  key?: string;
  type: 'group';
  label?: React.ReactNode;
  onClick?: ContextMenuClickHandler;
  children?: StackNavigationItem[];
}

export interface StackNavigationDividerItemType {
  key?: string;
  type: 'divider';
}

export type StackNavigationItem =
  | StackNavigationItemType
  | StackNavigationSubItemType
  | StackNavigationGroupItemType
  | StackNavigationDividerItemType;

export type StackNavigationProps = {
  items?: StackNavigationItem[];
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelect?: (path: string[]) => void;
};
