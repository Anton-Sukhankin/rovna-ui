import React from 'react';

export type ButtonGroupRef = HTMLDivElement;
export type ButtonGroupProps = React.ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode;
};
