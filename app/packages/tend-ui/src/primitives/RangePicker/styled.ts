import React from 'react';
import AntDatePicker from 'antd-core/es/date-picker';
import styled, { css } from 'styled-components';
import { colors } from '@rovna-ui/tokens/samolet';
import { height, margin } from '@rovna-ui/styling';
import { ChevronLeft } from '@rovna-ui/icons/ChevronLeft';
import { ChevronRight } from '@rovna-ui/icons/ChevronRight';

import { withInjectedClassName } from '@rovna-internal/components/hocs';

import { RangePickerRef } from './types';

export const Root = styled(
  withInjectedClassName<
    React.ComponentPropsWithoutRef<typeof AntDatePicker.RangePicker>,
    RangePickerRef
  >(AntDatePicker.RangePicker, 'popupClassName'),
)<{
  $height?: React.CSSProperties['height'];
  $width?: string;
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

  &.rovna-ui-picker-dropdown
    .rovna-ui-picker-cell-in-view.rovna-ui-picker-cell-range-start:not(
      .rovna-ui-picker-cell-range-start-single
    ):not(.rovna-ui-picker-cell-range-end)
    .rovna-ui-picker-cell-inner {
    border-start-end-radius: 8px;
    border-end-end-radius: 8px;
  }

  &.rovna-ui-picker-dropdown
    .rovna-ui-picker-cell-in-view.rovna-ui-picker-cell-range-end:not(
      .rovna-ui-picker-cell-range-end-single
    ):not(.rovna-ui-picker-cell-range-start)
    .rovna-ui-picker-cell-inner {
    border-start-start-radius: 8px;
    border-end-start-radius: 8px;
  }
`;

export const PrevIcon = styled(ChevronLeft)`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.gray50};
  transition: all 0.3s;
  &:hover:not(:active) {
    border-color: ${colors.blue600};
  }
  &:active {
    background-color: ${colors.blue100};
  }
`;
export const NextIcon = styled(ChevronRight)`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.gray50};
  transition: all 0.3s;
  &:hover:not(:active) {
    border-color: ${colors.blue600};
  }
  &:active {
    background-color: ${colors.blue100};
  }
`;
