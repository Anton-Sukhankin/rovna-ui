import AntSearch from 'antd-core/es/input/Search';
import styled, { DefaultTheme } from 'styled-components';
import { margin, width } from '@rovna-ui/styling';

export const Root = styled(AntSearch)<{ $theme: DefaultTheme }>`
  input {
    text-overflow: ellipsis;
  }

  .rovna-ui-input-prefix,
  .rovna-ui-input-suffix {
    color: ${props => props.$theme.colors.gray500};
  }

  &.rovna-ui-input-search {
    ${width};
    ${margin};
  }
`;
