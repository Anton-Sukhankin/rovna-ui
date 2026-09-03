import React from 'react';
import { Button } from '@rovna-ui/primitives';
import { DoubleArrowVertical } from '@rovna-ui/icons';
import { Dropdown } from '@rovna-ui/components/primitives';
import { Form } from '@rovna-ui/components/components/Form';
import { List } from '@rovna-ui/components/ui';

import { useTableForm } from '@rovna-internal/table/Table/hooks/useTableForm';
import { FormName } from '@rovna-internal/table/Table/consts/FormName';
import { useTableSorters } from '@rovna-internal/table/Table/hooks/useTableSorters';
import { useTableColumns } from '@rovna-internal/table/Table/hooks/useTableColumns';
import { useLabeledSorters } from '@rovna-internal/table/Table/hooks/useLabeledSorters';
import { Scope } from '@rovna-internal/table/Table/consts/Scope';

import { ToggleSorter } from './ToggleSorter';
import { SortersButtonProps } from './types';

const overlayStyle: React.CSSProperties = {
  minWidth: 245,
};

const SortersButton = ({ disabled }: SortersButtonProps) => {
  const { form } = useTableForm();
  const { columns } = useTableColumns();
  const { sorters } = useTableSorters();
  const labeled = useLabeledSorters(sorters, columns);

  return (
    <Dropdown
      trigger={labeled.length ? ['click'] : []}
      overlayStyle={overlayStyle}
      content={
        <Form component={false} form={form} name={FormName.Sorters}>
          <List>
            {labeled.map(sorter => (
              <Form.Item noStyle key={sorter.key} name={[Scope.Sorters, sorter.name]}>
                <ToggleSorter disabled={sorter.disabled}>{sorter.label}</ToggleSorter>
              </Form.Item>
            ))}
          </List>
        </Form>
      }
    >
      <Button
        aria-label='Сортировка таблицы'
        type='button'
        disabled={disabled}
        before={<DoubleArrowVertical />}
        variant='secondary'
      />
    </Dropdown>
  );
};

SortersButton.displayName = 'Table.ControlPanel.SortersButton';

export { SortersButton };
