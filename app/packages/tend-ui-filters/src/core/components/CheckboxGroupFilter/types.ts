import { CheckBoxGroupProps } from '@rovna-ui/components/primitives';

import { FilterConfig } from '../..';

export type CheckboxGroupFilterProps = CheckBoxGroupProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
