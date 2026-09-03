import { styling } from '@rovna-internal/styling/core/styling';
import { px } from '@rovna-internal/styling/core/px';

export const maxHeight = styling({
  $maxHeight: {
    type: 'string | number',
    properties: ['maxHeight'],
    transform: px,
  },
});
