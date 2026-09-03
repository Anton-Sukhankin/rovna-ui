import { Row } from '@tanstack/react-table';

import { TreeData, TreeStatus } from '@rovna-internal/tree/core';

export const useNodeStatus = <T extends TreeData>(
  row: Row<T>,
  predicates?: TreeStatus<T>,
) => {
  const status = predicates?.getNodeStatus?.(row.original);

  const isError = status === 'error';
  const isWarning = status === 'warning';
  const isSuccess = status === 'success';
  const isInfo = status === 'info';

  return { isError, isWarning, isSuccess, isInfo };
};
