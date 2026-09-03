import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import { ColumnsSettingsPresetsProvider } from '../../../../core/contexts/PresetsContext';
import { RootProps } from './types';

const Root = ({ settings, children, onColumnDragEnd }: RootProps) => {
  const columns = settings.getColumns().map(column => column.original);
  const defaultPresets = settings.getPresets().map(preset => preset.original);

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
      <ColumnsSettingsPresetsProvider settings={settings} presets={defaultPresets}>
        {children}
      </ColumnsSettingsPresetsProvider>
    </DndContext>
  );
};

Root.displayName = 'ColumnsSettings.Root';

export { Root };
