import React from 'react';

export type ListRef = React.ElementRef<'ul'>;
export type ListProps<T extends string = string> =
  React.ComponentPropsWithoutRef<'ul'> & {
    scrollable?: boolean;
    gap?: number;
    maxHeight?: string;
    header?: string;
    overflow?: React.CSSProperties['overflow'];

    onItemClick?: (value: T) => void;
  };
export type ListComponent = (<T extends string = string>(
  props: ListProps<T> & { ref?: React.ForwardedRef<ListRef> },
) => React.ReactElement) &
  Pick<React.FC, 'displayName'>;
