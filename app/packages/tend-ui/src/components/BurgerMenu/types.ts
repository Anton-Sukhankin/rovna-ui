import React from 'react';

import { TooltipProps } from '@rovna-internal/components/primitives/Tooltip';

type PolymorphicBurgerMenuItem<ElementType extends React.ElementType> = {
  as?: ElementType;
};

type BurgerMenuItemNode<ElementType extends React.ElementType> =
  PolymorphicBurgerMenuItem<ElementType> &
    Omit<
      React.ComponentPropsWithoutRef<ElementType>,
      keyof PolymorphicBurgerMenuItem<ElementType> | 'key'
    >;

type BaseBurgerMenuItem = {
  key?: string;
  disabled?: boolean;
  before?: React.ReactNode;
  after?: React.ReactNode;
  label?: React.ReactNode;
  tooltip?: Omit<TooltipProps, 'children'>;
};

export type BurgerMenuItem<ElementType extends React.ElementType = 'a'> =
  BurgerMenuItemNode<ElementType> & BaseBurgerMenuItem;

export type BurgerMenuProps = {
  items?: BurgerMenuItem[];
  selectedKeys?: string[];
  title?: React.ReactNode;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
};
