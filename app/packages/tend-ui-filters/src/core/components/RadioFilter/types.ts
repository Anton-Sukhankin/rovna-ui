import { RadioProps } from '@rovna-ui/components/primitives';

import { FilterConfig } from '../..';

export type RadioFilterProps = RadioProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
