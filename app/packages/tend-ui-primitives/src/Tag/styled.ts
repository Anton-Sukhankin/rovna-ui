import styled, { css } from 'styled-components';
import {
  BorderRadius,
  MaxWidth,
  Pointer,
  Width,
  borderRadius,
  margin,
  maxWidth,
  padding,
  pointer,
  width,
} from '@rovna-ui/styling';

type RootProps = BorderRadius &
  Pointer &
  Width &
  MaxWidth & {
    $color?: string;
    $backgroundColor?: string;
    $size: 'medium' | 'large';
    $shape: 'ellipse' | 'round';
    $preset: string;
  };

export const Root = styled.span.attrs({
  $shapes: {
    medium: {
      ellipse: css`
        border-radius: 12px;
      `,
      round: css`
        justify-content: center;
        border-radius: 50%;
        height: 16px;
        width: 16px;
      `,
    },
    large: {
      ellipse: css`
        border-radius: 12px;
      `,
      round: css`
        justify-content: center;
        border-radius: 50%;
        height: 24px;
        width: 24px;
      `,
    },
  },
  $sizes: {
    medium: css`
      font-family: ${props => props.theme.fonts.museo};
      font-weight: 400;
      font-size: ${props => props.theme.fontSizes['12']};
      line-height: 16px;
      padding: 0 6px;
    `,
    large: css`
      font-family: ${props => props.theme.fonts.museo};
      font-weight: 400;
      font-size: ${props => props.theme.fontSizes['14']};
      line-height: 20px;
      padding: 0 8px;
    `,
  },
})<RootProps>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ${props => props.$sizes[props.$size]};
  ${props => props.$shapes[props.$size][props.$shape]};

  color: ${props => props.$color};
  background-color: ${props => props.$backgroundColor};

  ${props => {
    if (props.$color || props.$backgroundColor)
      return css`
        color: ${props.$color || props.theme.colors.gray0};
        background-color: ${props.$backgroundColor || props.theme.colors.gray400};
      `;

    return {
      default: css`
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.gray400};
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
        color: ${props.theme.colors.gray900};
        background-color: ${props.theme.colors['gray100-transparent']};
      `,
      'blue-light': css`
        color: ${props.theme.colors.gray900};
        background-color: ${props.theme.colors['blue200-transparent']};
      `,
      'geekblue-light': css`
        color: ${props.theme.colors.gray900};
        background-color: ${props.theme.colors['geekblue200-transparent']};
      `,
      'green-light': css`
        color: ${props.theme.colors.gray900};
        background-color: ${props.theme.colors['green200-transparent']};
      `,
      'yellow-light': css`
        color: ${props.theme.colors.gray900};
        background-color: ${props.theme.colors['gold200-transparent']};
      `,
      'red-light': css`
        color: ${props.theme.colors.gray900};
        background-color: ${props.theme.colors['red200-transparent']};
      `,
      'cyan-light': css`
        color: ${props.theme.colors.gray900};
        background-color: ${props.theme.colors['cyan200-transparent']};
      `,
      'volcano-light': css`
        color: ${props.theme.colors.gray900};
        background-color: ${props.theme.colors['volcano200-transparent']};
      `,
      'purple-light': css`
        color: ${props.theme.colors.gray900};
        background-color: ${props.theme.colors['purple200-transparent']};
      `,
    }[props.$preset];
  }};
  ${margin};
  ${padding};
  ${pointer};
  ${borderRadius};
  ${width};
  ${maxWidth};
`;
