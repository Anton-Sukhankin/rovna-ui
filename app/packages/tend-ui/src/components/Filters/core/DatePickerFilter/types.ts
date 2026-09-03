import { DatePickerProps } from '@rovna-internal/components/primitives/DatePicker';

import { FilterConfig } from '../..';

export type DatePickerFilterProps = DatePickerProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
