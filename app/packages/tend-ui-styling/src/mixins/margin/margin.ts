import { css } from 'styled-components';

import { withUnit } from '@rovna-internal/styling/core/withUnit';

import { Margin } from './types';

export const margin = css<Margin>`
  margin: ${props => withUnit(props.$margin)};
  margin-top: ${props => withUnit(props.$marginTop)};
  margin-right: ${props => withUnit(props.$marginRight)};
  margin-bottom: ${props => withUnit(props.$marginBottom)};
  margin-left: ${props => withUnit(props.$marginLeft)};
`;
