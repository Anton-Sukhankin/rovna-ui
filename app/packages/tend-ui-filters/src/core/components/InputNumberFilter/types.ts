import { InputNumberProps, ValueType } from '@rovna-ui/components/primitives';

import { FilterConfig } from '../..';

export type InputNumberFilterProps<T extends ValueType = ValueType> =
  InputNumberProps<T> & {
    INTERNAL_scope?: string;
    config: FilterConfig;
  };
