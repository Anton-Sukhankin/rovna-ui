import React from 'react';

export type ScrollableProps = React.ComponentPropsWithoutRef<'div'> & {
  maxHeight?: React.CSSProperties['maxHeight'];
};
export type ScrollableRef = HTMLDivElement;
