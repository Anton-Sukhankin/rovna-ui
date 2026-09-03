import React from 'react';

export type CollapseGroupProps = {
  defaultOpen?: string[];
};
type ArrowPosition = 'start' | 'end';
export type CollapseRef = React.ElementRef<'div'>;
export type CollapseProps = React.ComponentPropsWithoutRef<'div'> & {
  children?: React.ReactNode;
  label?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  arrowPosition?: ArrowPosition;
};
