import React from 'react';

import { Dropdown } from '@rovna-internal/components/primitives/Dropdown';
import { useBoolean } from '@rovna-internal/components/hooks/useBoolean';
import { useScopedSorters } from '@rovna-internal/components/features/Table/hooks/useScopedSorters';
import { useTableForm } from '@rovna-internal/components/features/Table/hooks/useTableForm';
import { FormName } from '@rovna-internal/components/features/Table/consts/FormName';
import { Form } from '@rovna-internal/components/components/Form';
import { List } from '@rovna-internal/components/ui/List';
import { useTableSorters } from '@rovna-internal/components/features/Table/hooks/useTableSorters';
import { useTableColumns } from '@rovna-internal/components/features/Table/hooks/useTableColumns';
import { useLabeledSorters } from '@rovna-internal/components/features/Table/hooks/useLabeledSorters';

const overlayStyle: React.CSSProperties = {
  minWidth: 245,
};

import { SortersButton } from '../SortersButton';
import { ToggleSorter } from './ToggleSorter';

const Sorters = ({ open }: { open?: boolean }) => {
  const [selected, onOpenChange] = useBoolean();
  const { form } = useTableForm();
  const { columns } = useTableColumns();
  const { sorters } = useTableSorters();
  const labeled = useScopedSorters(useLabeledSorters(sorters, columns));

  return (
    <Dropdown
      open={open}
      trigger={['click']}
      onOpenChange={onOpenChange}
      overlayStyle={overlayStyle}
      content={
        <Form component={false} form={form} name={FormName.Sorters}>
          <List>
            {labeled.map(sorter => (
              <Form.Item noStyle key={sorter.key} name={sorter.name}>
                <ToggleSorter disabled={sorter.disabled}>{sorter.label}</ToggleSorter>
              </Form.Item>
            ))}
          </List>
        </Form>
      }
    >
      <SortersButton selected={selected} />
    </Dropdown>
  );
};

Sorters.displayName = 'Table.Toolbar.Sorters';

export { Sorters };
