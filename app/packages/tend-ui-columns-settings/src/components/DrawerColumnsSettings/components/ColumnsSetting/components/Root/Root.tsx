import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@rovna-ui/grid';

import { ColumnConfig } from '@rovna-internal/columns-settings/core/interfaces';

import { ColumnsSettingContext } from '../../contexts';
import { RootProps } from './types';

const Root = <T extends ColumnConfig = ColumnConfig>({
  column,
  className,
  children,
}: RootProps<T>) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: column.id, disabled: !column.draggable });

  const style: React.CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const value = React.useMemo(
    () => ({
      attributes,
      listeners,
      setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  );

  return (
    <Box
      data-testid='rovna-ui-columns-settings-column-setting-root'
      ref={setNodeRef}
      $display='flex'
      $alignItems='center'
      $gap={8}
      style={style}
      className={className}
    >
      <ColumnsSettingContext value={value}>{children}</ColumnsSettingContext>
    </Box>
  );
};

export { Root };
