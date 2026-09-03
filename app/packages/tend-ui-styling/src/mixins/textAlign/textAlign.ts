import { css } from 'styled-components';

import { TextAlign } from './types';

export const textAlign = css<TextAlign>`
  text-align: ${props => props.$textAlign};
`;
