import { AsyncCheckboxProps } from '@rovna-internal/components/components/AsyncCheckbox';

import { FilterConfig } from '../..';

export type AsyncCheckboxFilterProps = AsyncCheckboxProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
