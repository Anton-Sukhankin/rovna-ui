import styled, { css } from 'styled-components';
import { margin } from '@rovna-ui/styling';

import { AlertType } from './types';

export const Root = styled.div.attrs({
  $borders: {
    success: css`
      border: 1px solid ${props => props.theme.colors.green600};
    `,
    error: css`
      border: 1px solid ${props => props.theme.colors.red600};
    `,
    warning: css`
      border: 1px solid ${props => props.theme.colors.gold600};
    `,
    info: css`
      border: 1px solid ${props => props.theme.colors['gray50-transparent']};
    `,
    neutral: css`
      border: 1px solid ${props => props.theme.colors.gray400};
    `,
    loading: css`
      border: 1px solid ${props => props.theme.colors.gray400};
    `,
  },
  $layouts: {
    success: css`
      background-color: ${props => props.theme.colors['green100-transparent']};
    `,
    error: css`
      background-color: ${props => props.theme.colors['red100-transparent']};
    `,
    warning: css`
      background-color: ${props => props.theme.colors['gold100-transparent']};
    `,
    info: css`
      background-color: ${props => props.theme.colors['gray50-transparent']};
    `,
    neutral: css`
      background-color: ${props => props.theme.colors.gray50};
    `,
    loading: css`
      background-color: ${props => props.theme.colors.gray50};
    `,
  },
})<{ $border: boolean; $type: AlertType }>`
  ${margin};
  ${props => props.$border && props.$borders[props.$type]};
  ${props => props.$layouts[props.$type]};

  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 10px;
`;

export const CloseButton = styled.button`
  cursor: pointer;
  display: flex;
  padding: 0;
  margin: 0;
  border-color: transparent;
  background: transparent;
  color: ${props => props.theme.colors.gray650};

  /* Animation */
  transition: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: color;

  &:hover {
    color: ${props => props.theme.colors.gray900};
  }
`;
export const Action = styled.div`
  font-family: ${props => props.theme.fonts.museo};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;
