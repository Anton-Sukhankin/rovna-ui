import React from 'react';

import { FormName } from '@rovna-internal/components/features/Table/consts/FormName';
import { useTableForm } from '@rovna-internal/components/features/Table/hooks/useTableForm';
import { useTableFilters } from '@rovna-internal/components/features/Table/hooks/useTableFilters';
import { useFilter } from '@rovna-internal/components/features/Table/hooks/useFilter';
import { useScopedFilters } from '@rovna-internal/components/features/Table/hooks/useScopedFilters';
import { Form } from '@rovna-internal/components/components/Form';
import { FilterPicker } from '@rovna-internal/components/components/Filters/Filters';

import { useColumnContext } from '../../contexts/ColumnContext';
import { ResetButton } from './components/ResetButton';
import { Header } from './components/Header';

const Filter = () => {
  const column = useColumnContext();
  const { form } = useTableForm();
  const { clear, filters } = useTableFilters();
  const [filter] = useScopedFilters(useFilter(filters, column.id));

  if (!filter) return null;

  return (
    <Form component={false} form={form} name={FormName.Filter}>
      <Form.Item noStyle name={filter.name}>
        <FilterPicker config={filter} {...filter.component} />
      </Form.Item>
      <ResetButton
        onClick={() => {
          clear(filter.name);
        }}
      />
    </Form>
  );
};

Filter.displayName = 'Table.ContextMenu.Filter';
Filter.Header = Header;

export { Filter };
