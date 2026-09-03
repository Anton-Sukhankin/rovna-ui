import { css } from 'styled-components';

import { FontWeight } from './types';

export const fontWeight = css<FontWeight>`
  font-weight: ${props => props.$fontWeight};
`;
