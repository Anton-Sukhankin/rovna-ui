import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import { colors } from '@rovna-ui/tokens/samolet';
import { ChevronRight } from '@rovna-ui/icons/ChevronRight';
import type { IconProps } from '@rovna-ui/icons/Icon';

export const NextIcon = styled(ChevronRight)`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.gray50};
  transition: all 0.3s;
  &:hover:not(:active) {
    border-color: ${colors.blue600};
  }
  &:active {
    background-color: ${colors.blue100};
  }
` as StyledComponent<'span', DefaultTheme, IconProps>;
