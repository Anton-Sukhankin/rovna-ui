import { RadioGroupSearchProps } from '@rovna-ui/components/components';

import { FilterConfig } from '../..';

export type RadioGroupSearchFilterProps = RadioGroupSearchProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
