import { RadioProps } from '@rovna-internal/components/primitives/Radio';

import { FilterConfig } from '../..';

export type RadioFilterProps = RadioProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
