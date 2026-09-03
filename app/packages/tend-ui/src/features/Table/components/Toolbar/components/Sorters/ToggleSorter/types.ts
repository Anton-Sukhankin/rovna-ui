import React from 'react';

import { SortingOrder } from '@rovna-internal/components/features/Table/types/SortingOrder';

export type ToggleSorterProps = {
  disabled?: boolean;
  order?: SortingOrder[];
  value?: SortingOrder;
  children?: React.ReactNode;
  onChange?: (order: SortingOrder) => void;
};
