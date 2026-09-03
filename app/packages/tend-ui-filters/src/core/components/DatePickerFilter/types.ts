import { DatePickerProps } from '@rovna-ui/components/primitives';

import { FilterConfig } from '../..';

export type DatePickerFilterProps = DatePickerProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
