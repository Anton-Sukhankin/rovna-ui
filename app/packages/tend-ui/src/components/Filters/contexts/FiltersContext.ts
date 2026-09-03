import { contextFactory } from '@rovna-internal/components/factories/contextFactory';

import { CoreFiltersProps } from '../types';

type FiltersContextType = Pick<
  CoreFiltersProps,
  | 'name'
  | 'debounce'
  | 'onFilterValuesChange'
  | 'onFiltersReset'
  | 'onFilterReset'
  | 'value'
> & {
  form: NonNullable<CoreFiltersProps['form']>;
};

export const [FiltersContext, useFiltersContext] = contextFactory<FiltersContextType>();
