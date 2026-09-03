import AntRadio from 'antd-core/es/radio';
import styled, { DefaultTheme } from 'styled-components';

export const Root = styled(AntRadio)<{ $theme: DefaultTheme }>`
  &.rovna-ui-radio-wrapper {
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
`;
