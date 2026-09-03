import { Row } from '@tanstack/react-table';

import { TreeChecking, TreeData, TreeEditing, TreePinning } from '@rovna-internal/tree/core';

export const useNodeAllowance = <T extends TreeData>(
  row: Row<T>,
  predicates?: TreeChecking<T> & TreeEditing<T> & TreePinning<T>,
) => {
  const canAddNode = predicates?.canAddNode?.(row.original);
  const canEditNode = predicates?.canEditNode?.(row.original);
  const canRemoveNode = predicates?.canRemoveNode?.(row.original);
  const canPinNode = predicates?.canPinNode?.(row.original);

  return { canAddNode, canEditNode, canRemoveNode, canPinNode };
};
