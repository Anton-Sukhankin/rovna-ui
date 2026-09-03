import { SortingOrder } from '@rovna-internal/table/Table/types/SortingOrder';

export type ToggleSorterProps = {
  variant?: 'default' | 'alphabetical' | 'novelty';
  disabled?: boolean;
  value?: SortingOrder;
  onChange?: (value: SortingOrder) => void;
};
