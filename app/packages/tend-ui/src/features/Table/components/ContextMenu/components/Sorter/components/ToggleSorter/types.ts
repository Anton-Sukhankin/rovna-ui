import React from 'react';

import { SortingOrder } from '@rovna-internal/components/features/Table/types/SortingOrder';

export type ItemProps = {
  header?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  ascending?: React.ReactNode;
  descending?: React.ReactNode;
  value?: SortingOrder;
  onChange?: (value: SortingOrder) => void;
};
