import { CheckBoxGroupProps } from '@rovna-internal/components/primitives/Checkbox';

import { FilterConfig } from '../..';

export type CheckboxGroupFilterProps = CheckBoxGroupProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
