import React from 'react';
import AntPopover from 'antd-core/es/popover';

type AntPopoverProps = React.ComponentPropsWithoutRef<typeof AntPopover>;
export type PopoverRef = React.ElementRef<typeof AntPopover>;
export type PopoverProps = AntPopoverProps & {
  footer?: React.ReactNode[];
};
