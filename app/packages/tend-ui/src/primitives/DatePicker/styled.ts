import React from 'react';
import AntDatePicker from 'antd-core/es/date-picker';
import styled, { css } from 'styled-components';
import { height, margin } from '@rovna-ui/styling';

import { withInjectedClassName } from '@rovna-internal/components/hocs';

import { DatePickerRef } from './types';

export const Root = styled(
  withInjectedClassName<
    React.ComponentPropsWithoutRef<typeof AntDatePicker>,
    DatePickerRef
  >(AntDatePicker, 'popupClassName'),
)<{
  $height: string;
  $width: string;
  $fullWidth?: boolean;
}>`
  &.rovna-ui-picker {
    ${props => {
      if (props.$fullWidth)
        return css`
          width: 100%;
        `;

      return css`
        width: ${props.$width};
      `;
    }}

    ${margin};
    ${height};
  }

  &.rovna-ui-picker-dropdown {
    .rovna-ui-picker-month-btn {
      text-transform: uppercase;
    }

    .rovna-ui-picker-header {
      padding: 8px 16px;
    }

    .rovna-ui-picker-header-super-prev-btn,
    .rovna-ui-picker-header-super-next-btn {
      display: none;
    }

    .rovna-ui-picker-date-panel .rovna-ui-picker-body {
      padding: 8px 16px;
    }
  }

  &.rovna-ui-picker-dropdown .rovna-ui-picker-year-panel .rovna-ui-picker-cell-inner,
  &.rovna-ui-picker-dropdown .rovna-ui-picker-quarter-panel .rovna-ui-picker-cell-inner,
  &.rovna-ui-picker-dropdown .rovna-ui-picker-month-panel .rovna-ui-picker-cell-inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
  }
`;
