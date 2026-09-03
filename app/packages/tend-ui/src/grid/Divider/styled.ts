import React from 'react';
import styled, { css } from 'styled-components';
import AntDivider from 'antd-core/es/divider';
import { isUndefined } from '@rovna-ui/utils/isUndefined';
import { isString } from '@rovna-ui/utils/isString';

export const Root = styled(AntDivider)<{
  $margin?: React.CSSProperties['margin'];
  $color?: React.CSSProperties['color'];
}>`
  ${props => {
    if (isUndefined(props.$margin)) return;
    if (isString(props.$margin))
      return css`
        &.rovna-ui-divider-horizontal {
          margin: ${props.$margin};
        }

        &.rovna-ui-divider-vertical {
          margin-inline: ${props.$margin};
        }
      `;

    return css`
      &.rovna-ui-divider-horizontal {
        margin: ${props.$margin}px 0;
      }

      &.rovna-ui-divider-vertical {
        margin-inline: ${props.$margin}px;
      }
    `;
  }};

  &.rovna-ui-divider {
    border-block-start-color: ${props => props.$color};
  }

  &.rovna-ui-divider-vertical {
    border-inline-start-color: ${props => props.$color};
  }
`;
