import { css } from 'styled-components';

import { Color } from '../color';

export const color = css<Color>`
  color: ${props => props.$color};
`;
