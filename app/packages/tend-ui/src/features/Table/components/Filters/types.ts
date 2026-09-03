import { FiltersProps as DefaultFiltersProps } from '@rovna-internal/components/components/Filters/types';
import { GenericObject } from '@rovna-internal/components/types/GenericObject';
export type FiltersProps<T extends GenericObject = GenericObject> = Omit<
  DefaultFiltersProps<T>,
  'filters' | 'resetAllButtonProps' | 'form' | 'name' | 'onFiltersReset' | 'onFilterReset'
>;
