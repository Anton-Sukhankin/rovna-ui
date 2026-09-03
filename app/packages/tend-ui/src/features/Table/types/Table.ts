import { SortingOrder } from '@rovna-internal/components/features/Table/types/SortingOrder';
import { GenericObject } from '@rovna-internal/components/types/GenericObject';

export type TableForm<TFilter extends GenericObject = GenericObject> = {
  filters: TFilter;
  sorters: Record<keyof TFilter, SortingOrder>;
  search: string;
};
