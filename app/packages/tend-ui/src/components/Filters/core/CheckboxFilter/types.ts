import { CheckboxProps } from '@rovna-internal/components/primitives/Checkbox';

import { FilterConfig } from '../..';

export type CheckboxFilterProps = CheckboxProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
