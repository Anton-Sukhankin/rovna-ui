import { css } from 'styled-components';

import { withUnit } from '@rovna-internal/styling/core/withUnit';

import { Width } from './types';

export const width = css<Width>`
  width: ${props => withUnit(props.$width)};
`;
