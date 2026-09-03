import styled, { DefaultTheme, css } from 'styled-components';
import AntInputNumber from 'antd-core/es/input-number';

import { AntInputNumberComponentType } from './types';

export const Root = styled(AntInputNumber)<{
  $fullWidth?: boolean;
  $theme: DefaultTheme;
}>`
  ${props =>
    props.$fullWidth &&
    css`
      &.rovna-ui-input-number,
      &.rovna-ui-input-number-affix-wrapper {
        width: 100%;
      }
    `}

  input {
    text-overflow: ellipsis;
  }

  &.rovna-ui-input-number-affix-wrapper {
    .rovna-ui-input-number-prefix,
    .rovna-ui-input-number-suffix {
      color: ${props => props.$theme.colors.gray500};
    }
  }
` as AntInputNumberComponentType;
