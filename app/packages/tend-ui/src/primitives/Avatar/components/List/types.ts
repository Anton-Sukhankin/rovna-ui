import React from 'react';

export type ListRef = React.ElementRef<'span'>;
export type ListProps = React.ComponentPropsWithoutRef<'span'> & {
  max?: number;
};
