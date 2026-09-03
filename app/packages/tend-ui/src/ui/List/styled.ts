import styled, { DefaultTheme, css } from 'styled-components';

import { scrollbar } from '@rovna-internal/components/styling/mixins/scrollbar';
import { isUndefined } from '@rovna-internal/components/utils';

export const Root = styled.ul<{
  $theme: DefaultTheme;
  $gap?: number;
  $scrollable?: boolean;
  $maxHeight?: string;
}>`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;

  ${props => {
    if (isUndefined(props.$gap)) return;

    return css`
      gap: ${props.$gap}px;
    `;
  }};

  ${props => {
    if (!props.$scrollable) return;

    return css`
      max-height: ${props.$maxHeight || '160px'};
      overflow: auto;
    `;
  }}

  ${scrollbar};
`;
