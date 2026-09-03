import { DeleteForever } from '@rovna-ui/components/icons';
import { CheckboxOptionType, Dialog, Toast } from '@rovna-ui/components/primitives';
import React, { useCallback } from 'react';

import {
  useFiltersPresetsMutation,
  useFiltersPresetsQuery,
} from '@notifications/api/hooks';
import { useFilters, useSetFilters } from '@notifications/app/store/hooks';
import { initialFilters } from '@notifications/shared/consts/filters';

type DeletePresetButtonProps = {
  presetName: CheckboxOptionType['value'];
};

export const DeletePresetButton = ({ presetName }: DeletePresetButtonProps) => {
  const filters = useFilters();
  const setFilters = useSetFilters();

  const { presets } = useFiltersPresetsQuery();
  const { performFiltersPresetsSave } = useFiltersPresetsMutation();

  const handleDelete = useCallback(() => {
    const newPresets = presets.filter(preset => preset.name !== presetName);
    performFiltersPresetsSave(newPresets, {
      onSuccess: () => {
        Toast.success({ message: `Фильтр «${presetName}» удалён` });
        if (filters.preset === presetName) setFilters(initialFilters);
      },
    });
  }, [performFiltersPresetsSave, setFilters, filters, presets, presetName]);

  const handleDialog = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();

      Dialog.confirm({
        title: `Вы действительно хотите удалить фильтр?`,
        content: `Фильтр «${presetName}» будет удалён безвозвратно`,
        onOk: handleDelete,
        okButtonProps: { preset: 'danger' },
        okText: 'Удалить',
      });
    },
    [presetName, handleDelete],
  );

  return <DeleteForever color='red600' size={16} onClick={handleDialog} />;
};
