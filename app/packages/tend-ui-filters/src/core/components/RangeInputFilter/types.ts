import { RangeInputProps } from '@rovna-ui/primitives';

import { FilterConfig } from '../..';

export type RangeInputFilterProps = RangeInputProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
