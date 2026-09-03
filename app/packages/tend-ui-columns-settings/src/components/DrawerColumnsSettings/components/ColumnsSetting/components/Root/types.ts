import React from 'react';

import { ColumnConfig } from '@rovna-internal/columns-settings/core/interfaces';

export type RootProps<T extends ColumnConfig = ColumnConfig> = {
  children?: React.ReactNode;
  className?: string;
  column: T;
};
