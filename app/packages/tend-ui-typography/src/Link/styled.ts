import styled, { DefaultTheme, css } from 'styled-components';
import AntLink from 'antd-core/es/typography/Link';
import {
  TextAlign,
  Uppercase,
  WhiteSpace,
  textAlign,
  uppercase,
  whiteSpace,
} from '@rovna-ui/styling';

export const Root = styled(AntLink).attrs({
  $sizes: {
    small: css`
      font-size: 12px;
      line-height: 16px;
    `,
    medium: '',
    large: css`
      font-size: 16px;
      line-height: 24px;
    `,
  },
})<
  Uppercase &
    TextAlign &
    WhiteSpace & {
      $theme: DefaultTheme;
      $size: 'large' | 'medium' | 'small';
      $disabled?: boolean;
    }
>`
  &.rovna-ui-typography {
    display: inline-flex;
    gap: 4px;

    & > u {
      gap: 4px;
      display: inline-flex;
    }

    ${props => props.$sizes[props.$size]};
    ${uppercase};
    ${props =>
      props.$textAlign &&
      css`
        display: inline-block;
        ${textAlign};
      `}

    ${whiteSpace};

    ${props =>
      !props.$disabled &&
      css`
        &:focus {
          border-radius: 4px;
          background-color: ${props.$theme.colors['blue150-transparent']};
        }
      `}

    .anticon {
      font-size: 16px;
    }
  }
`;
