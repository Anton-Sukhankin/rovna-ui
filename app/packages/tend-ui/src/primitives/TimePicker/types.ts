import AntDatePicker from 'antd-core/es/date-picker';
import React from 'react';

import { Size } from '@rovna-internal/components/types/Size';

type AntTimePickerProps = React.ComponentPropsWithoutRef<typeof AntDatePicker.TimePicker>;
export type TimePickerRef = React.ElementRef<typeof AntDatePicker.TimePicker>;
export type TimePickerProps = Omit<AntTimePickerProps, 'size'> & {
  width?: string;
  fullWidth?: boolean;
  size?: Size;
};
