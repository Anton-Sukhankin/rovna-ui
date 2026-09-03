import { AsyncCheckboxProps } from '@rovna-ui/components/components';

import { FilterConfig } from '../..';

export type AsyncCheckboxFilterProps = AsyncCheckboxProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
