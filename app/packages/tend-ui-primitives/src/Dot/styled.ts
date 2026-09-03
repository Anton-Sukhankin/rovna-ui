import styled, { css } from 'styled-components';
import { pointer } from '@rovna-ui/styling';

import type { BubbleProps } from './types';

export const Content = styled.span`
  font-family: ${props => props.theme.fonts.museo};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const Root = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const Bubble = styled.span.attrs({
  $placements: {
    leftTop: css`
      top: ${(props: BubbleProps) => props.$offset[1] || 0}px;
      left: ${(props: BubbleProps) => props.$offset[0] || 0}px;
      transform: scale(1) translate(-50%, -50%);
      transform-origin: 100% 0%;
    `,
    rightTop: css`
      top: ${(props: BubbleProps) => props.$offset[1] || 0}px;
      right: ${(props: BubbleProps) => props.$offset[0] || 0}px;
      transform: scale(1) translate(50%, -50%);
      transform-origin: 100% 0%;
    `,
    rightBottom: css`
      bottom: ${(props: BubbleProps) => props.$offset[1] || 0}px;
      right: ${(props: BubbleProps) => props.$offset[0] || 0}px;
      transform: scale(1) translate(50%, 50%);
      transform-origin: 100% 0%;
    `,
    leftBottom: css`
      bottom: ${(props: BubbleProps) => props.$offset[1] || 0}px;
      left: ${(props: BubbleProps) => props.$offset[0] || 0}px;
      transform: scale(1) translate(-50%, 50%);
      transform-origin: 100% 0%;
    `,
  },
})<BubbleProps>`
  width: 8px;
  height: 8px;
  border-radius: 32px;

  ${props => {
    if (props.$inline) return;

    return css`
      position: absolute;
      z-index: 1;
      ${props.$placements[props.$placement]};
    `;
  }};

  ${props => {
    if (props.$backgroundColor)
      return css`
        background-color: ${props.$backgroundColor || props.theme.colors.gray50};
      `;

    return {
      default: css`
        background-color: ${props => props.theme.colors.gray50};
      `,
      success: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props => props.theme.colors.green600};
      `,
      warning: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props => props.theme.colors.gold600};
      `,
      processing: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props => props.theme.colors.blue600};
      `,
      error: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props => props.theme.colors.red600};
      `,
      gray: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.gray650};
      `,
      blue: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.blue600};
      `,
      geekblue: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.geekblue600};
      `,
      green: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.green600};
      `,
      yellow: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.gold600};
      `,
      red: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.red600};
      `,
      cyan: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.cyan600};
      `,
      volcano: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.volcano600};
      `,
      purple: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.purple600};
      `,
      'gray-light': css`
        color: ${props.theme.colors.gray650};
        background-color: ${props.theme.colors.gray50};
      `,
      'blue-light': css`
        color: ${props.theme.colors.blue700};
        background-color: ${props.theme.colors.blue100};
      `,
      'geekblue-light': css`
        color: ${props.theme.colors.geekblue600};
        background-color: ${props.theme.colors.geekblue200};
      `,
      'green-light': css`
        color: ${props.theme.colors.green700};
        background-color: ${props.theme.colors.green100};
      `,
      'yellow-light': css`
        color: ${props.theme.colors.gold800};
        background-color: ${props.theme.colors.gold200};
      `,
      'red-light': css`
        color: ${props.theme.colors.red700};
        background-color: ${props.theme.colors.red100};
      `,
      'cyan-light': css`
        color: ${props.theme.colors.cyan800};
        background-color: ${props.theme.colors.cyan100};
      `,
      'volcano-light': css`
        color: ${props.theme.colors.volcano700};
        background-color: ${props.theme.colors.volcano100};
      `,
      'purple-light': css`
        color: ${props.theme.colors.purple500};
        background-color: ${props.theme.colors.purple100};
      `,
    }[props.$preset];
  }};

  ${pointer};
`;
