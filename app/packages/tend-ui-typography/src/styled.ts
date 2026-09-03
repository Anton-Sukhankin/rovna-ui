import { css } from 'styled-components';

import { Size } from './types';

export const fontSize = <T extends { $size?: Size }>(props: T) => {
  if (!props.$size)
    return css`
      line-height: 20px;
    `;

  return {
    large: css`
      font-size: 16px;
      line-height: 24px;
    `,
    medium: css`
      line-height: 20px;
    `,
    small: css`
      font-size: 12px;
      line-height: 16px;
    `,
    xs: css`
      font-size: 10px;
      line-height: 16px;
    `,
  }[props.$size];
};
