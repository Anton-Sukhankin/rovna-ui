import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import { ColumnConfig } from '@rovna-internal/components/components/ColumnsSettings/core/interfaces';

import { ColumnsSettingsPresetsProvider } from '../../contexts/PresetsContext';
import { RootProps } from './types';

const Root = <T extends ColumnConfig = ColumnConfig>({
  columns,
  children,
  onColumnDragEnd,
  defaultPresets = [],
  onPresetApply,
  onPresetEdit,
  onPresetRemove,
  onPresetSave,
}: RootProps<T>) => {
  const handleDragEnd = React.useCallback(
    (e: DragEndEvent) => {
      if (!e.over) return;
      if (e.active.id === e.over.id) return;
      const ids = columns.map(column => column.id);
      const from = ids.indexOf(e.active.id.toString());
      const to = ids.indexOf(e.over.id.toString());
      onColumnDragEnd?.(from, to);
    },
    [columns, onColumnDragEnd],
  );

  return (
    <DndContext data-testid='rovna-ui-columns-settings-root' onDragEnd={handleDragEnd}>
      <ColumnsSettingsPresetsProvider
        presets={defaultPresets}
        onPresetApply={onPresetApply}
        onPresetEdit={onPresetEdit}
        onPresetRemove={onPresetRemove}
        onPresetSave={onPresetSave}
      >
        {children}
      </ColumnsSettingsPresetsProvider>
    </DndContext>
  );
};

Root.displayName = 'ColumnsSettings.Root';

export { Root };
