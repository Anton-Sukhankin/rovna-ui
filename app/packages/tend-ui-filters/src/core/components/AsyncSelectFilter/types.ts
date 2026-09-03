import { AsyncSelectProps } from '@rovna-ui/components/components';

import { FilterConfig } from '@rovna-internal/filters/core/types';

export type AsyncSelectFilterProps = AsyncSelectProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
