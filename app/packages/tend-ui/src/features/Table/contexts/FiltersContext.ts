import { FilterConfig } from '@rovna-internal/components/components/Filters';
import { contextFactory } from '@rovna-internal/components/factories/contextFactory';

type FiltersContextType = {
  filters: FilterConfig[];
  clear: (name: string) => void;
  reset: () => void;
};
const [FiltersContext, _useFiltersContext] =
  contextFactory<FiltersContextType>('Table.FiltersContext');
const useFiltersContext = () => {
  const ctx = _useFiltersContext();

  return ctx as FiltersContextType;
};

export { FiltersContext, useFiltersContext };
export type { FiltersContextType };
