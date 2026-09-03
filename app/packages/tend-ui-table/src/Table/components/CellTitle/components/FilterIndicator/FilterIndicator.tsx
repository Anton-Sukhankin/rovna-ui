import React from 'react';
import { FilterAlt } from '@rovna-ui/icons';
import { Form } from '@rovna-ui/components/components/Form';

import { useTableForm } from '@rovna-internal/table/Table/hooks/useTableForm';
import { useFilter } from '@rovna-internal/table/Table/hooks/useFilter';
import { useTableFilters } from '@rovna-internal/table/Table/hooks/useTableFilters';
import { useTableValue } from '@rovna-internal/table/Table/hooks/useTableValue';
import { useTableDefaultValue } from '@rovna-internal/table/Table/hooks/useTableDefaultValue';
import { Scope } from '@rovna-internal/table/Table/consts/Scope';

const FilterIndicator = ({ id }: { id: string }) => {
  const { form } = useTableForm();
  const [filter] = useFilter(useTableFilters().filters, id);
  const { filter: defaultFilterValue } = useTableDefaultValue(id);
  const { filter: _filter } = useTableValue(id);
  const value =
    Form.useWatch([Scope.Filters, filter.name], form) ?? defaultFilterValue ?? _filter;
  const isShown = Array.isArray(value) ? value.length > 0 : !!value;

  if (!isShown) return null;

  return <FilterAlt size={12} color='blue600' />;
};

FilterIndicator.displayName = 'Table.CellTitle.FilterIndicator';

export { FilterIndicator };
