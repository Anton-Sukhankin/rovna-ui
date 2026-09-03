import React from 'react';
import { isUndefined } from '@rovna-ui/utils';

import { Dropdown } from '@rovna-internal/components/primitives/Dropdown';
import { useBoolean } from '@rovna-internal/components/hooks/useBoolean';
import { useTableColumns } from '@rovna-internal/components/features/Table/hooks/useTableColumns';
import { ColumnConfig } from '@rovna-internal/components/features/Table/types/Columns';
import { Box } from '@rovna-internal/components/grid/Box';
import { useColumn } from '@rovna-internal/components/features/Table/hooks/useColumn';
import { Divider as _Divider } from '@rovna-internal/components/ui/Divider';
import { useTableFilters } from '@rovna-internal/components/features/Table/hooks/useTableFilters';
import { useFilter } from '@rovna-internal/components/features/Table/hooks/useFilter';
import { useScopedFilters } from '@rovna-internal/components/features/Table/hooks/useScopedFilters';
import { useSorter } from '@rovna-internal/components/features/Table/hooks/useSorter';
import { useTableSorters } from '@rovna-internal/components/features/Table/hooks/useTableSorters';
import { useScopedSorters } from '@rovna-internal/components/features/Table/hooks/useScopedSorters';

import { ContextMenuProps } from './types';
import { ColumnActions } from './components/Actions';
import { Filter } from './components/Filter';
import { Sorter } from './components/Sorter';
import { ColumnsContext } from './contexts/ColumnContext';

const Divider = () => <_Divider margin='12px 0' padding='0' />;

const overlayStyle: React.CSSProperties = {
  minWidth: 245,
};

// TODO: Перенести в rovna-ui-utils
const isObject = (value: unknown): value is object => typeof value === 'object';
const divided = (node: React.ReactNode, index: number) => {
  return index === 0 ? (
    node
  ) : (
    <>
      <Divider />
      {node}
    </>
  );
};

const Content = ({
  children,
  content,
}: React.PropsWithChildren<{ content?: React.ReactNode }>) => {
  if (isUndefined(content))
    return (
      <Box $display='flex' $flexDirection='column' $gap={8} $width={245}>
        {children}
      </Box>
    );

  return (
    <Box $display='flex' $flexDirection='column' $gap={8} $width={245}>
      {content}
    </Box>
  );
};

const BaseContextMenu = <T extends ColumnConfig = ColumnConfig>({
  id = '',
  children,
  content,
}: ContextMenuProps) => {
  const [open, onOpenChange] = useBoolean();
  const { columns } = useTableColumns<T>();
  const [column] = useColumn(columns, id);
  const [sorter] = useScopedSorters(useSorter(useTableSorters().sorters, column?.id));
  const [filter] = useScopedFilters(useFilter(useTableFilters().filters, column?.id));
  if (!column) return <>{children}</>;

  return (
    <Dropdown
      trigger={['click']}
      open={open}
      overlayStyle={overlayStyle}
      content={
        <ColumnsContext value={column}>
          <Content content={content}>
            {[
              sorter && <Sorter />,
              filter && <Filter />,
              <ColumnActions key={`features-table-column-actions-${id}`} />,
            ]
              .filter(isObject)
              .map(divided)}
          </Content>
        </ColumnsContext>
      }
      onOpenChange={onOpenChange}
    >
      {children}
    </Dropdown>
  );
};

export const ContextMenu = Object.assign(BaseContextMenu, {
  displayName: 'Table.ContextMenu',
  Sorter,
  Filter,
  ColumnActions,
  Divider,
});
