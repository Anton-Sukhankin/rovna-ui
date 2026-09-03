import React from 'react';
import { Dropdown } from '@rovna-ui/components/primitives';
import { useBoolean } from '@rovna-ui/components/hooks';
import { Form } from '@rovna-ui/components/components/Form';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';
import { List } from '@rovna-ui/components/ui';

import { useTableForm } from '@rovna-internal/table/Table/hooks/useTableForm';
import { FormName } from '@rovna-internal/table/Table/consts/FormName';
import { useTableSorters } from '@rovna-internal/table/Table/hooks/useTableSorters';
import { useTableColumns } from '@rovna-internal/table/Table/hooks/useTableColumns';
import { useLabeledSorters } from '@rovna-internal/table/Table/hooks/useLabeledSorters';
import { Scope } from '@rovna-internal/table/Table/consts/Scope';

import { SortersButton } from '../SortersButton';
import { ToggleSorter } from './ToggleSorter';

const overlayStyle: React.CSSProperties = {
  minWidth: 245,
};

/**
 * @deprecated Компонент устарел и больше не поддерживаешься
 * Используйте `<Table.ControlPanel.SortersButton />`
 */
const Sorters = ({ open }: { open?: boolean }) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      '<Table.Toolbar.Sorters /> устарел и более не поддерживается.',
      '',
      'Используйте <Table.ControlPanel />.',
    ]);
  }
  const [selected, onOpenChange] = useBoolean();
  const { form } = useTableForm();
  const { columns } = useTableColumns();
  const { sorters } = useTableSorters();
  const labeled = useLabeledSorters(sorters, columns);

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
              <Form.Item noStyle key={sorter.key} name={[Scope.Sorters, sorter.name]}>
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
