import React from 'react';
import { ArrowUp } from '@rovna-ui/icons/ArrowUp';
import { ArrowDown } from '@rovna-ui/icons/ArrowDown';

import { useTableForm } from '@rovna-internal/components/features/Table/hooks/useTableForm';
import { Form } from '@rovna-internal/components/components/Form';
import { useScopedSorters } from '@rovna-internal/components/features/Table/hooks/useScopedSorters';
import { useSorter } from '@rovna-internal/components/features/Table/hooks/useSorter';
import { useTableSorters } from '@rovna-internal/components/features/Table/hooks/useTableSorters';
import { SortingOrder } from '@rovna-internal/components/features/Table/types/SortingOrder';
import { useTableValue } from '@rovna-internal/components/features/Table/hooks/useTableValue';
import { useTableDefaultValue } from '@rovna-internal/components/features/Table/hooks/useTableDefaultValue';

const SorterIndicator = ({ id }: { id: string }) => {
  const { form } = useTableForm();
  const [sorter] = useScopedSorters(useSorter(useTableSorters().sorters, id));
  const { sorter: defaultSorterValue } = useTableDefaultValue(id);
  const { sorter: _sorter } = useTableValue(id);
  const value =
    (Form.useWatch(sorter.name, form) as SortingOrder) ?? defaultSorterValue ?? _sorter;
  const isAscending = value === 'ascend';
  const isDescending = value === 'descend';

  if (isAscending) return <ArrowUp color='gray500' size={16} />;
  if (isDescending) return <ArrowDown color='gray500' size={16} />;

  return null;
};

SorterIndicator.displayName = 'Table.CellTitle.SorterIndicator';

export { SorterIndicator };
