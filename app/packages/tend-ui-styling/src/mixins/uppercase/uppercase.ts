import { css } from 'styled-components';

import { Uppercase } from './types';

export const uppercase = <T extends Uppercase = Uppercase>(props: T) => {
  if (!props.$uppercase) return;

  return css`
    text-transform: uppercase;
    letter-spacing: 1px;
  `;
};
