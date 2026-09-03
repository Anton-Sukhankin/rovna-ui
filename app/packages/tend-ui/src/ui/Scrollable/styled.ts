import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

import { isNumber } from '@rovna-internal/components/utils';
import { scrollbar } from '@rovna-internal/components/styling/mixins/scrollbar';

export const Root = styled.div<{
  $theme: DefaultTheme;
  $maxHeight?: React.CSSProperties['maxHeight'];
}>`
  ${scrollbar};
  width: 100%;
  overflow: auto;
  // FIXME: Выглядит как костыль, возможно, есть более правильное решение
  // https://stackoverflow.com/questions/10251369/css-max-height-and-overflow-auto-always-displays-vertical-scroll
  // Проблема неидеальности шрифтов и появления вертикального скролла
  padding-bottom: 1px;
  margin-bottom: -1px;
  max-height: ${props => {
    if (isNumber(props.$maxHeight)) return `${props.$maxHeight}px`;

    return props.$maxHeight;
  }};
`;
