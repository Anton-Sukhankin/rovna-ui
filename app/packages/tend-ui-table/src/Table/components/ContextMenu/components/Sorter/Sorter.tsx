import React from 'react';
import { Form } from '@rovna-ui/components/components/Form';

import { useTableForm } from '@rovna-internal/table/Table/hooks/useTableForm';
import { FormName } from '@rovna-internal/table/Table/consts/FormName';
import { useSorter } from '@rovna-internal/table/Table/hooks/useSorter';
import { useTableSorters } from '@rovna-internal/table/Table/hooks/useTableSorters';
import { Scope } from '@rovna-internal/table/Table/consts/Scope';

import { useColumnContext } from '../../contexts/ColumnContext';
import { ToggleSorter } from './components';

const Sorter = () => {
  const column = useColumnContext();
  const { form } = useTableForm();
  const { sorters } = useTableSorters();
  const [sorter] = useSorter(sorters, column.id);
  const value = React.useMemo(() => sorter, [sorter]);

  if (!sorter) return null;

  return (
    <Form component={false} form={form} name={FormName.Sorter}>
      <Form.Item noStyle name={[Scope.Sorters, sorter.name]}>
        <ToggleSorter disabled={value.disabled} variant={value.variant} />
      </Form.Item>
    </Form>
  );
};

Sorter.displayName = 'ContextMenu.Sorter';

export { Sorter };
