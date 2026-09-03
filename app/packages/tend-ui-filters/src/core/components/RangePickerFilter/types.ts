import { RangePickerProps } from '@rovna-ui/components/primitives';

import { FilterConfig } from '../..';

export type RangePickerFilterProps = RangePickerProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
