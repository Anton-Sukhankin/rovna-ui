import React from 'react';
import { ArrowDown, ArrowUp } from '@rovna-ui/icons';
import { Form } from '@rovna-ui/components/components';

import { useTableForm } from '@rovna-internal/table/Table/hooks/useTableForm';
import { useSorter } from '@rovna-internal/table/Table/hooks/useSorter';
import { useTableSorters } from '@rovna-internal/table/Table/hooks/useTableSorters';
import { SortingOrder } from '@rovna-internal/table/Table/types/SortingOrder';
import { useTableValue } from '@rovna-internal/table/Table/hooks/useTableValue';
import { useTableDefaultValue } from '@rovna-internal/table/Table/hooks/useTableDefaultValue';
import { Scope } from '@rovna-internal/table/Table/consts/Scope';

const SorterIndicator = ({ id }: { id: string }) => {
  const { form } = useTableForm();
  const [sorter] = useSorter(useTableSorters().sorters, id);
  const { sorter: defaultSorterValue } = useTableDefaultValue(id);
  const { sorter: _sorter } = useTableValue(id);
  const value =
    Form.useWatch<SortingOrder>([Scope.Sorters, sorter.name], form) ??
    defaultSorterValue ??
    _sorter;
  const isAscending = value === 'ascend';
  const isDescending = value === 'descend';

  if (isAscending) return <ArrowUp color='gray650' size={12} />;
  if (isDescending) return <ArrowDown color='gray650' size={12} />;

  return null;
};

SorterIndicator.displayName = 'Table.CellTitle.SorterIndicator';

export { SorterIndicator };
