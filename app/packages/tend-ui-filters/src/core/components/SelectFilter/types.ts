import { SelectProps } from '@rovna-ui/components/primitives';

import { FilterConfig } from '../..';

export type SelectFilterProps = SelectProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
