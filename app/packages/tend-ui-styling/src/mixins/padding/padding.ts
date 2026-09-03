import { css } from 'styled-components';

import { withUnit } from '@rovna-internal/styling/core/withUnit';

import { Padding } from './types';

export const padding = css<Padding>`
  padding: ${props => withUnit(props.$padding)};
  padding-top: ${props => withUnit(props.$paddingTop)};
  padding-right: ${props => withUnit(props.$paddingRight)};
  padding-bottom: ${props => withUnit(props.$paddingBottom)};
  padding-left: ${props => withUnit(props.$paddingLeft)};
`;
