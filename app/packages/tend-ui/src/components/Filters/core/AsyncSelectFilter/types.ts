import { AsyncSelectProps } from '@rovna-internal/components/components/AsyncSelect';
import { FilterConfig } from '@rovna-internal/components/features/Table/types';

export type AsyncSelectFilterProps = AsyncSelectProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};
