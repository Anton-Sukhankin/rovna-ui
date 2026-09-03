import Input from 'antd-core/es/input/Input';
import styled, { DefaultTheme } from 'styled-components';
import { height, margin, padding, width } from '@rovna-ui/styling';

export const Root = styled(Input)<{
  $theme: DefaultTheme;
}>`
  &.rovna-ui-input {
    font-size: 14px;
    line-height: 24px;
    text-overflow: ellipsis;
  }
  &.rovna-ui-input-affix-wrapper {
    > input.rovna-ui-input {
      text-overflow: ellipsis;
      font-size: 14px;
      line-height: 24px;
    }
    .rovna-ui-input-suffix {
      color: ${props => props.$theme.colors.gray400};
    }
    .rovna-ui-input-prefix {
      margin-inline-end: 8px;
      color: ${props => props.$theme.colors.gray400};
    }
    .rovna-ui-input-clear-icon {
      display: flex;
    }
    .anticon {
      font-size: 16px;
    }
  }

  &.rovna-ui-input,
  &.rovna-ui-input-affix-wrapper {
    ${width};
    ${height};
    ${margin};
    ${padding};
  }
`;
