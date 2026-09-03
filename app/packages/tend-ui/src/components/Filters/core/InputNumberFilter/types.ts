import { InputNumberProps, ValueType } from '@rovna-internal/components/primitives/InputNumber';

import { FilterConfig } from '../..';

export type InputNumberFilterProps<T extends ValueType = ValueType> =
  InputNumberProps<T> & {
    INTERNAL_scope?: string;
    config: FilterConfig;
  };
