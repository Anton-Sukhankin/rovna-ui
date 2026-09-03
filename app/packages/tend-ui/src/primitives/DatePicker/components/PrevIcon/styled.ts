import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import { colors } from '@rovna-ui/tokens/samolet';
import { ChevronLeft } from '@rovna-ui/icons/ChevronLeft';
import type { IconProps } from '@rovna-ui/icons/Icon';

export const PrevIcon = styled(ChevronLeft)`
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
