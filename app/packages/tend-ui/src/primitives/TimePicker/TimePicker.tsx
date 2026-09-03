import React from 'react';

import { useSize } from '@rovna-internal/components/hooks/useSize';
import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Root } from './styled';
import { TimePickerProps, TimePickerRef } from './types';

const TimePicker = React.forwardRef<TimePickerRef, TimePickerProps>(
  ({ fullWidth, width, ...props }, ref) => {
    const theme = useTheme();
    const size = useSize(props.size);

    return (
      <Root
        data-testid='rovna-ui-time-picker'
        {...props}
        ref={ref}
        $theme={theme}
        $fullWidth={fullWidth}
        $width={width}
        size={size}
      />
    );
  },
);

TimePicker.displayName = 'TimePicker';

export { TimePicker };
