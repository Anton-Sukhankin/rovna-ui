import { RadioGroupProps } from '@rovna-ui/components/primitives';

import { FilterConfig } from '../..';

export type RadioGroupFilterProps = RadioGroupProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
