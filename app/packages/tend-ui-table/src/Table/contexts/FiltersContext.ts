import { FilterConfig } from '@rovna-ui/filters';
import { contextFactory } from '@rovna-ui/factories';
import { GenericObject } from '@rovna-ui/types';

type FiltersContextType = {
  filters: FilterConfig[];
  hotFilters: FilterConfig[];
  clear: (name: string) => void;
  reset: () => void;
  onFilterValuesChange: (changed: GenericObject, values: GenericObject) => void;
  onFilterValuesFinish: (values: GenericObject) => void;
};
const [FiltersContext, _useFiltersContext] =
  contextFactory<FiltersContextType>('Table.FiltersContext');
const useFiltersContext = () => {
  const ctx = _useFiltersContext();

  return ctx as FiltersContextType;
};

export { FiltersContext, useFiltersContext };
export type { FiltersContextType };
