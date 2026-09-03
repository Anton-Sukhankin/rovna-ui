import React from 'react';

import { UseColumnsParameters, useColumns } from '../../hooks/useColumns';
import { ColumnConfig } from '../../core';

export const Template = (props: UseColumnsParameters<ColumnConfig>) => {
  const settings = useColumns<ColumnConfig>(props);
  console.log(settings);

  return <div>Template</div>;
};
