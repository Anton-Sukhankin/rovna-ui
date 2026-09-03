import { FilterValue } from '@rovna-internal/filters/core/types';
import { CoreFiltersProps } from '@rovna-internal/filters/types';

export type CoreHotFiltersProps<T extends FilterValue = FilterValue> = Pick<
  CoreFiltersProps<T>,
  'filters' | 'INTERNAL_scope' | 'debounce' | 'form' | 'name' | 'onFilterValuesChange'
>;

export type HotFiltersProps<T extends FilterValue = FilterValue> = CoreFiltersProps<T> & {
  layout?: 'vertical' | 'horizontal';
};
