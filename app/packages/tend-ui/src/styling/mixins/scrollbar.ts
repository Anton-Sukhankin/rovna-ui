import { DefaultTheme, css } from 'styled-components';
import { colors } from '@rovna-ui/tokens/samolet';

export const scrollbar = css<{ $theme?: DefaultTheme }>`
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ $theme = { colors } }) => $theme.colors.gray50};
    border-radius: 16px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ $theme = { colors } }) => $theme.colors.gray150};
    border-radius: 16px;
  }
`;
