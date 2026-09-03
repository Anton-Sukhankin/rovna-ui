import { Dayjs } from 'dayjs';

import { SelectProps } from '@rovna-internal/components/primitives/Select/types';

export type TimeSelectProps = Omit<SelectProps<string>, 'onChange'> & {
  from?: number;
  to?: number;
  step?: { hour?: number; minute?: number };
  onChange?: (value: Dayjs) => void;
};
