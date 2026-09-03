import { css } from 'styled-components';

import { withUnit } from '@rovna-internal/styling/core/withUnit';

import { Height } from './types';

export const height = css<Height>`
  height: ${props => withUnit(props.$height)};
`;
