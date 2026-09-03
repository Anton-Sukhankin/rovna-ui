import { CheckboxProps } from '@rovna-ui/components/primitives';

import { FilterConfig } from '../..';

export type CheckboxFilterProps = CheckboxProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
