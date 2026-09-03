import { InputProps } from '@rovna-internal/components/primitives';

import { FilterConfig } from '../..';

export type InputFilterProps = InputProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
