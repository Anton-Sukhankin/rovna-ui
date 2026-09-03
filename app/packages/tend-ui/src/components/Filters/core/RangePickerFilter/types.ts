import { RangePickerProps } from '@rovna-internal/components/primitives/RangePicker';

import { FilterConfig } from '../..';

export type RangePickerFilterProps = RangePickerProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
