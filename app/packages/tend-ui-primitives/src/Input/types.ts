import React from 'react';
import AntInput from 'antd-core/es/input/Input';
import {
  DimensionProperties,
  MarginProperties,
  PaddingProperties,
} from '@rovna-ui/styling';

import { TooltipProps } from '../Tooltip/types';

type AntInputProps = React.ComponentPropsWithoutRef<typeof AntInput>;
export type InputRef = React.ElementRef<typeof AntInput>;
export type InputProps = Omit<AntInputProps, 'allowClear' | 'size'> & {
  allowClear?: boolean;
  clearIconTooltip?: Omit<TooltipProps, 'children'>;
  size?: 'large' | 'medium' | 'small';
} & MarginProperties &
  PaddingProperties &
  DimensionProperties;
