import { GenericObject } from '@rovna-ui/types';

import { SortingOrder } from '@rovna-internal/table/Table/types/SortingOrder';

export type TableForm<TFilter extends GenericObject = GenericObject> = {
  filters: TFilter;
  sorters: Record<keyof TFilter, SortingOrder>;
  search: string;
};
