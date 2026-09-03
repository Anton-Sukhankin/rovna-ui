import React from 'react';
import AntAlert from 'antd-core/es/alert';

import { TooltipProps } from '@rovna-internal/components/primitives/Tooltip';

type AntAlertProps = React.ComponentPropsWithoutRef<typeof AntAlert>;
type Type = AntAlertProps['type'] | 'neutral' | 'loading';
export type AlertRef = React.ElementRef<typeof AntAlert>;
export type AlertProps = Omit<
  AntAlertProps,
  'children' | 'type' | 'icon' | 'closeIcon' | 'showIcon'
> & {
  type?: Type;
  border?: boolean;
  footer?: React.ReactNode[];
  closeIconTooltip?: Omit<TooltipProps, 'children'>;
};
