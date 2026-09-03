import React from 'react';
import { Divider } from '@rovna-ui/components/ui';
import { Form } from '@rovna-ui/components/components/Form';

import { FormName } from '@rovna-internal/table/Table/consts/FormName';
import { useTableForm } from '@rovna-internal/table/Table/hooks/useTableForm';
import { ColumnConfig } from '@rovna-internal/table/Table/types/Columns';
import { useTableFilters } from '@rovna-internal/table/Table/hooks/useTableFilters';
import { useFilter } from '@rovna-internal/table/Table/hooks/useFilter';

export const Root = <T extends ColumnConfig = ColumnConfig>({
  children,
  column,
}: {
  column: T;
  children?: React.ReactNode;
}) => {
  const { form } = useTableForm();
  const [filter] = useFilter(useTableFilters().filters, column.id);

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
