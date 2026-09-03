import { RadioGroupProps } from '@rovna-internal/components/primitives/Radio';

import { FilterConfig } from '../..';

export type RadioGroupFilterProps = RadioGroupProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
