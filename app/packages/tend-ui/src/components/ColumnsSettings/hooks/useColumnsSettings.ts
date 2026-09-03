import React from 'react';

import { CoreColumnsSettingsProps } from '@rovna-internal/components/components/ColumnsSettings/types';
import {
  ColumnConfig,
  ColumnPosition,
} from '@rovna-internal/components/components/ColumnsSettings/core/interfaces';
import { useColumns } from '@rovna-internal/components/components/ColumnsSettings/hooks';

export const useColumnsSettings = <T extends ColumnConfig = ColumnConfig>(
  model: ReturnType<typeof useColumns<T>>[1],
) => {
  const onColumnVisibilityChange = React.useCallback(
    (visible: boolean, column: T) => {
      model.display(visible, column);
    },
    [model],
  );

  const onColumnPinningChange = React.useCallback(
    (position: ColumnPosition, column: T) => {
      model.pin(position, column);
    },
    [model],
  );

  const onColumnsReset = React.useCallback(() => {
    model.reset();
  }, [model]);

  const onColumnDragEnd = React.useCallback(
    (from: number, to: number) => {
      model.swap(from, to);
    },
    [model],
  );

  const properties = React.useMemo<CoreColumnsSettingsProps<T>>(
    () => ({
      columns: model.columns,
      onColumnVisibilityChange,
      onColumnPinningChange,
      onColumnDragEnd,
      onColumnsReset,

      defaultPresets: model.presets,
      onPresetApply: model.applyPreset,
      onPresetSave: model.savePreset,
      onPresetEdit: model.editPreset,
      onPresetRemove: removed => model.removePreset(removed.id),
    }),
    [
      model,
      onColumnDragEnd,
      onColumnPinningChange,
      onColumnVisibilityChange,
      onColumnsReset,
    ],
  );

  return properties;
};
