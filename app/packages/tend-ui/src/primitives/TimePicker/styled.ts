import React from 'react';
import AntDatePicker from 'antd-core/es/date-picker';
import styled, { DefaultTheme, css } from 'styled-components';

import { withInjectedClassName } from '@rovna-internal/components/hocs';
import { scrollbar } from '@rovna-internal/components/styling/css';

import { TimePickerRef } from './types';

export const Root = styled(
  withInjectedClassName<
    React.ComponentPropsWithoutRef<typeof AntDatePicker.TimePicker>,
    TimePickerRef
  >(AntDatePicker.TimePicker, 'popupClassName'),
)<{ $width?: string; $fullWidth?: boolean; $theme: DefaultTheme }>`
  &.rovna-ui-picker {
    ${props => {
      if (props.$fullWidth)
        return css`
          width: 100%;
        `;

      return css`
        width: ${props.$width || '256px'};
      `;
    }}
  }

  &.rovna-ui-picker-dropdown .rovna-ui-picker-time-panel-column {
    ${scrollbar}
  }
`;
