import AntRadio from 'antd-core/es/radio';
import React from 'react';
import styled, { DefaultTheme, css } from 'styled-components';

// eslint-disable-next-line import/no-named-as-default-member
export const Root = styled(AntRadio.Group)<
  React.AriaAttributes & {
    role?: React.AriaRole;
    $theme: DefaultTheme;
    $fullWidth: boolean;
    $layout: 'horizontal' | 'vertical';
  }
>`
  &.rovna-ui-radio-group {
    display: inline-flex;

    ${props => {
      if (props.$layout === 'vertical') {
        return css`
          flex-direction: column;
          row-gap: 8px;
        `;
      }

      return css`
        .rovna-ui-radio-wrapper {
          margin-inline-end: 16px;
        }
      `;
    }}

    .rovna-ui-radio-wrapper {
      /* Aligning Radio */
      .rovna-ui-radio {
        align-self: flex-start;
      }

      /* Checked state */
      .rovna-ui-radio-checked {
        &:not(.rovna-ui-radio-disabled) {
          /* Active state color */
          .rovna-ui-radio-inner {
            /* TODO: Replace by token */
            background-color: ${props => props.$theme.colors.gray0};

            /* TODO: Replace by token */
            &:after {
              background-color: ${props => props.$theme.colors.blue600};
            }
          }
        }
      }
    }
    ${props =>
      props.$fullWidth &&
      css`
        &.rovna-ui-radio-group {
          width: 100%;
          .rovna-ui-radio + span {
            display: inline-block;
            width: 100%;
          }
        }
      `};
  }
`;
