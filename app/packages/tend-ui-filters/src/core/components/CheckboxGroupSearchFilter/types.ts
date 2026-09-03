import { CheckboxGroupSearchProps } from '@rovna-ui/components/components';

import { FilterConfig } from '../..';

export type CheckboxGroupSearchFilterProps = CheckboxGroupSearchProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
