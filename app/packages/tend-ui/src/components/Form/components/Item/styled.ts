import React from 'react';
import styled, { DefaultTheme, css } from 'styled-components';
import AntForm, { FormItemProps as AntFormItemProps } from 'antd-core/es/form';
import { isNumber } from '@rovna-ui/utils/isNumber';

type Props = {
  $theme: DefaultTheme;
  $width?: number | string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RootComponent = <T = any>(props: AntFormItemProps<T> & Props) => React.ReactElement;

export const Root = styled(AntForm.Item)<Props>`
  &.rovna-ui-form-item {
    .rovna-ui-form-item-control-input-content {
      /* Additional 4px margin for 8px in total */
      .rovna-ui-checkbox-group,
      .rovna-ui-toggle-group,
      .rovna-ui-radio-group {
        margin-top: 4px;
      }
    }
    /* Error message */
    .rovna-ui-form-item-explain-error {
      align-items: center;
      font-size: 12px;
      padding-top: 4px;
    }

    /* Extra content (aka Caption message) */
    .rovna-ui-form-item-extra {
      font-size: 12px;
      min-height: auto;
      margin-top: 4px;
      color: ${props => props.$theme.colors.gray650};
    }

    /* Require icon */
    .rovna-ui-form-item-label > label {
      &.rovna-ui-form-item-required:not(
          .rovna-ui-form-item-required-mark-optional
        )::before {
        font-family: ${props => props.$theme.fonts.museo};
      }

      /* Tooltip icon */
      .rovna-ui-form-item-tooltip {
        font-size: 16px;
        color: ${props => props.$theme.colors.gray500};
      }
    }

    /* Highlight Checkbox and Radio border on error */
    &.rovna-ui-form-item-has-error {
      .rovna-ui-checkbox-inner,
      .rovna-ui-radio-inner {
        border-color: ${props => props.$theme.colors.red600};
      }
    }

    /* Forcing suffixes color */
    &&& {
      .rovna-ui-input-prefix,
      .rovna-ui-input-suffix {
        color: ${props => props.$theme.colors.gray500};
      }
    }

    ${props => {
      if (isNumber(props.$width))
        return css`
          width: ${props.$width}px;
        `;

      return css`
        width: ${props.$width};
      `;
    }}
  }
` as RootComponent;
