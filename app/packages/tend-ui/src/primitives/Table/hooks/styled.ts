import { SortOrder } from 'antd-core/es/table/interface';
import styled, { DefaultTheme, css } from 'styled-components';
import { ArrowDown } from '@rovna-ui/icons/ArrowDown';

export const FilterListIcon = styled(ArrowDown)<{
  $theme: DefaultTheme;
  $sortOrder?: SortOrder;
}>`
  ${props => {
    if (props.$sortOrder === 'ascend')
      return css`
        color: ${props.$theme.colors.blue600};
      `;
    if (props.$sortOrder === 'descend')
      return css`
        color: ${props.$theme.colors.blue600};
        transform: rotate(180deg);
      `;

    return;
  }}
`;
