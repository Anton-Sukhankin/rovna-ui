import { px } from '@rovna-internal/styling/core/px';
import { styling } from '@rovna-internal/styling/core/styling';

export const borderRadius = styling({
  $borderRadius: {
    type: 'string | number',
    properties: ['borderRadius'],
    transform: px,
  },
});
