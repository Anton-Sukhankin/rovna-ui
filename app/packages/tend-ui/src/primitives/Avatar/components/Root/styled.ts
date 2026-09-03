import styled, { css } from 'styled-components';
import { BackgroundColor, Pointer, backgroundColor, pointer } from '@rovna-ui/styling';

import { AvatarSize } from '../../types';

const Root = styled.span.attrs({
  $sizes: {
    xl: css`
      width: 80px;
      height: 80px;
    `,
    large: css`
      width: 48px;
      height: 48px;
    `,
    medium: css`
      width: 40px;
      height: 40px;
    `,
    small: css`
      width: 32px;
      height: 32px;
    `,
  },
})<
  Pointer &
    BackgroundColor & { $borderColor?: string; $size: AvatarSize; $bordered?: boolean }
>`
  font-family: Museo Sans Cyrl;
  color: ${props => props.theme.colors.blue600};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;

  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  ${backgroundColor};
  overflow: hidden;
  ${props => props.$sizes[props.$size]};
  ${pointer};
  border-style: solid;
  border-color: ${props => (props.$bordered ? props.$borderColor : 'transparent')};
  border-width: 2px;
  transition: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: border-color;

  &:hover {
    border-color: ${props => props.theme.colors.blue100};
  }
`;

export { Root };
