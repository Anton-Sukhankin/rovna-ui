import React from 'react';
import { Form } from '@rovna-ui/components/components/Form';
import { INTERNAL_FilterPicker as FilterPicker } from '@rovna-ui/filters';

import { FormName } from '@rovna-internal/table/Table/consts/FormName';
import { useTableForm } from '@rovna-internal/table/Table/hooks/useTableForm';
import { useTableFilters } from '@rovna-internal/table/Table/hooks/useTableFilters';
import { useFilter } from '@rovna-internal/table/Table/hooks/useFilter';
import { Scope } from '@rovna-internal/table/Table/consts/Scope';

import { useColumnContext } from '../../contexts/ColumnContext';
import { ResetButton } from './components/ResetButton';
import { Header } from './components/Header';

const Filter = () => {
  const column = useColumnContext();
  const { form } = useTableForm();
  const { clear, filters } = useTableFilters();
  const [filter] = useFilter(filters, column.id);

  if (!filter) return null;

  return (
    <Form component={false} form={form} name={FormName.Filter}>
      <Form.Item noStyle name={[Scope.Filters, filter.name]}>
        <FilterPicker
          config={filter}
          {...filter.component}
          INTERNAL_scope={Scope.Filters}
        />
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
