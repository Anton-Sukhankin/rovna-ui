import { CSSProperties } from 'styled-components';

import { styling } from '@rovna-internal/styling/core/styling';
import { px } from '@rovna-internal/styling/core/px';

export type MaxWidth = { $maxWidth?: CSSProperties['maxWidth'] };
export const maxWidth = styling({
  $maxWidth: {
    type: 'string | number',
    properties: ['maxWidth'],
    transform: px,
  },
});
