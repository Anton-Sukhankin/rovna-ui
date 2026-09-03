import { createContext } from '@rovna-ui/factories';

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
  apply: () => void;
};

export const [FiltersContext, useFiltersContext] =
  createContext<FiltersContextType>('FiltersContext');
