import React from 'react';
import { FilterAlt } from '@rovna-ui/icons/FilterAlt';

import { useTableForm } from '@rovna-internal/components/features/Table/hooks/useTableForm';
import { Form } from '@rovna-internal/components/components/Form';
import { useScopedFilters } from '@rovna-internal/components/features/Table/hooks/useScopedFilters';
import { useFilter } from '@rovna-internal/components/features/Table/hooks/useFilter';
import { useTableFilters } from '@rovna-internal/components/features/Table/hooks/useTableFilters';
import { useTableValue } from '@rovna-internal/components/features/Table/hooks/useTableValue';
import { useTableDefaultValue } from '@rovna-internal/components/features/Table/hooks/useTableDefaultValue';

const FilterIndicator = ({ id }: { id: string }) => {
  const { form } = useTableForm();
  const [filter] = useScopedFilters(useFilter(useTableFilters().filters, id));
  const { filter: defaultFilterValue } = useTableDefaultValue(id);
  const { filter: _filter } = useTableValue(id);
  const value = Form.useWatch(filter.name, form) ?? defaultFilterValue ?? _filter;
  const isShown = Array.isArray(value) ? value.length > 0 : !!value;

  if (!isShown) return null;

  return <FilterAlt size={16} color='blue600' />;
};

FilterIndicator.displayName = 'Table.CellTitle.FilterIndicator';

export { FilterIndicator };
