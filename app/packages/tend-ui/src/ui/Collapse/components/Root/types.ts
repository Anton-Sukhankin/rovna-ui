import React from 'react';

export type RootRef = React.ElementRef<'div'>;
export type RootProps = {
  id?: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};
