import { SelectProps } from '@rovna-internal/components/primitives/Select';

import { FilterConfig } from '../..';

export type SelectFilterProps = SelectProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
