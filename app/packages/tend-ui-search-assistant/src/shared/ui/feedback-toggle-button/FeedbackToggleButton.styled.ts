import styled, { css } from 'styled-components';
import { ToggleButton } from '@rovna-ui/components/primitives';
import { colors } from '@rovna-ui/tokens/samolet';

export const FeedbackToggleButton = styled(ToggleButton)<{ selected?: boolean }>`
  color: ${colors.gray500};
  background: none;

  padding: 4px;
  height: 24px;
  width: 24px;

  &:hover:not(:disabled) {
    color: ${colors.blue700};
    background: ${colors.blue100};
  }
  &:active:not(:disabled) {
    color: ${colors.blue700};
    background: ${colors.blue100};
  }

  ${props => {
    if (props.selected)
      return css`
        color: ${colors.blue600};
        background: ${colors.blue100};
      `;
  }}
` as typeof ToggleButton;
