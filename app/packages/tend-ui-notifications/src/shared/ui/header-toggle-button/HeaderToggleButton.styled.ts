import styled, { css } from 'styled-components';
import { ToggleButton } from '@rovna-ui/components/primitives';
import { colors } from '@rovna-ui/tokens/samolet';

export const HeaderToggleButton = styled(ToggleButton)<{ $selected?: boolean }>`
  ${props => {
    if (props.$selected)
      return css`
        color: ${colors.gray0};
        background: #268ffc;

        &:hover:not(:disabled) {
          color: ${colors.gray0};
          background: #1988fb;
        }
        &:active:not(:disabled) {
          color: ${colors.gray0};
          background: #268ffc;
        }
      `;

    return css`
      color: ${colors.gray0};

      &:hover:not(:disabled) {
        color: ${colors.gray0};
        background: #1988fb;
      }
      &:active:not(:disabled) {
        color: ${colors.gray0};
        background: #268ffc;
      }
    `;
  }}
` as typeof ToggleButton;
