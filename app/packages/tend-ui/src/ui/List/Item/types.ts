import React from 'react';

export type ItemRef = React.ElementRef<'li'>;
export type ItemProps<T extends string = string> = Omit<
  React.ComponentPropsWithoutRef<'li'>,
  'value' | 'onClick'
> & {
  disabled?: boolean;
  value?: T;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLLIElement>, value?: T) => void;
};

export type ItemComponent = (<T extends string = string>(
  props: ItemProps<T> & { ref?: React.ForwardedRef<ItemRef> },
) => React.ReactElement) &
  Pick<React.FC, 'displayName'>;
