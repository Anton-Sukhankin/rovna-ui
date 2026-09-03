import React from 'react';

import { Form } from '@rovna-internal/components/components/Form';
import { useTableForm } from '@rovna-internal/components/features/Table/hooks/useTableForm';
import { useScopedSorters } from '@rovna-internal/components/features/Table/hooks/useScopedSorters';
import { ColumnConfig } from '@rovna-internal/components/features/Table/types/Columns';
import { FormName } from '@rovna-internal/components/features/Table/consts/FormName';
import { useSorter } from '@rovna-internal/components/features/Table/hooks/useSorter';
import { useTableSorters } from '@rovna-internal/components/features/Table/hooks/useTableSorters';
import { SorterContext } from '@rovna-internal/components/features/Table/components/ContextMenu/components/Sorter/contexts';

import { RootProps } from './types';

const Root = <T extends ColumnConfig = ColumnConfig>({
  column,
  children,
}: RootProps<T>) => {
  const { form } = useTableForm();
  const { sorters } = useTableSorters();
  const [sorter] = useScopedSorters(useSorter(sorters, column.id));
  const value = React.useMemo(() => sorter, [sorter]);
  if (!sorter) return null;

  return (
    <SorterContext value={value}>
      <Form component={false} form={form} name={FormName.Sorter}>
        <Form.Item noStyle name={sorter.name}>
          {children}
        </Form.Item>
      </Form>
    </SorterContext>
  );
};

Root.displayName = 'Table.ContextMenu.Sorter.Root';

export { Root };
