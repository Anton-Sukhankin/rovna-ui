import React from 'react';
import AntDatePicker, {
  DatePickerProps as AntPickerProps,
} from 'antd-core/es/date-picker';
import { MarginProperties } from '@rovna-ui/styling';

import { Size } from '@rovna-internal/components/types/Size';
import { TooltipProps } from '@rovna-internal/components/primitives/Tooltip';

export type DatePickerRef = React.ElementRef<typeof AntDatePicker>;
export type DatePickerProps = Omit<
  AntPickerProps,
  'size' | 'allowClear' | 'nextIcon' | 'superNextIcon' | 'prevIcon' | 'superPrevIcon'
> & {
  fullWidth?: boolean;
  showToday?: boolean;
  allowClear?: boolean;
  clearIconTooltip?: TooltipProps;
  size?: Size;
  width?: string;
} & MarginProperties;
