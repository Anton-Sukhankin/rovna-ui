import AntPassword from 'antd-core/es/input/Password';
import styled, { DefaultTheme } from 'styled-components';

export const Root = styled(AntPassword)<{ $theme: DefaultTheme }>`
  .rovna-ui-input-prefix,
  .rovna-ui-input-suffix {
    color: ${props => props.$theme.colors.gray500};
  }
`;
