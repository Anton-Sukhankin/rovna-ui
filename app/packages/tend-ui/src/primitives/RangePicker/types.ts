import React from 'react';
import AntDatePicker, {
  RangePickerProps as AntRangePickerProps,
} from 'antd-core/es/date-picker';
import { MarginProperties } from '@rovna-ui/styling';

import { TooltipProps } from '@rovna-internal/components/primitives/Tooltip';
import { Size } from '@rovna-internal/components/types/Size';

export type RangePickerRef = React.ElementRef<typeof AntDatePicker.RangePicker>;
export type RangePickerProps = Omit<
  AntRangePickerProps,
  | 'size'
  | 'allowClear'
  | 'nextIcon'
  | 'superNextIcon'
  | 'prevIcon'
  | 'superPrevIcon'
  | 'suffixIcon'
> &
  MarginProperties & {
    fullWidth?: boolean;
    allowClear?: boolean;
    clearIconTooltip?: TooltipProps;
    size?: Size;
    width?: string;
  };
