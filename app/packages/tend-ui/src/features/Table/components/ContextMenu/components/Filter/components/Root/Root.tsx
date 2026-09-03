import React from 'react';

import { FormName } from '@rovna-internal/components/features/Table/consts/FormName';
import { useTableForm } from '@rovna-internal/components/features/Table/hooks/useTableForm';
import { ColumnConfig } from '@rovna-internal/components/features/Table/types/Columns';
import { useTableFilters } from '@rovna-internal/components/features/Table/hooks/useTableFilters';
import { useFilter } from '@rovna-internal/components/features/Table/hooks/useFilter';
import { useScopedFilters } from '@rovna-internal/components/features/Table/hooks/useScopedFilters';
import { Divider } from '@rovna-internal/components/ui/Divider';
import { Form } from '@rovna-internal/components/components/Form';

export const Root = <T extends ColumnConfig = ColumnConfig>({
  children,
  column,
}: {
  column: T;
  children?: React.ReactNode;
}) => {
  const { form } = useTableForm();
  const { filters } = useTableFilters();
  const [filter] = useScopedFilters(useFilter(filters, column.id));

  if (!filter) return null;

  return (
    <>
      <Form component={false} form={form} name={FormName.Filter}>
        {children}
      </Form>
      <Divider margin='0 -16px' padding='0 16px' />
    </>
  );
};
