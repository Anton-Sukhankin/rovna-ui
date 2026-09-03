import { css } from 'styled-components';

import { FontSize } from './types';

export const fontSize = css<FontSize>`
  font-size: ${props => props.$fontSize};
`;
