import React from 'react';

import { ColumnsSettings } from '@rovna-internal/columns-settings/core';

export type RootProps = {
  settings: ColumnsSettings;
  children?: React.ReactNode;
  onColumnDragEnd?: (from: number, to: number) => void;
};
