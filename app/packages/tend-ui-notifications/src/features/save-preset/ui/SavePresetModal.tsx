import { Input, Modal, Toast } from '@rovna-ui/components/primitives';
import React, { useCallback, useState } from 'react';

import {
  useFiltersPresetsMutation,
  useFiltersPresetsQuery,
} from '@notifications/api/hooks';
import { useFilters, useSetFilters } from '@notifications/app/store/hooks';

type SavePresetModalProps = {
  open: boolean;
  close: () => void;
};

export const SavePresetModal = ({ open, close }: SavePresetModalProps) => {
  const [name, setName] = useState('');

  const filters = useFilters();
  const setFilters = useSetFilters();
  const { presets } = useFiltersPresetsQuery();
  const { performFiltersPresetsSave, isFiltersPresetsSaving } =
    useFiltersPresetsMutation();

  const handleSave = useCallback(() => {
    performFiltersPresetsSave([...presets, { name, filters }], {
      onSuccess: () => {
        Toast.success({ message: `Фильтр «${name}» сохранён` });
        setFilters({ ...filters, preset: name });
        close();
      },
    });
  }, [performFiltersPresetsSave, close, setFilters, presets, filters, name]);

  return (
    <Modal
      centered
      size='small'
      title='Добавить название фильтра'
      open={open}
      onCancel={close}
      onOk={handleSave}
      confirmLoading={isFiltersPresetsSaving}
      okText='Сохранить'
      cancelText='Отменить'
    >
      <Input
        autoFocus
        allowClear
        placeholder='Название фильтра'
        onChange={e => setName(e.target.value)}
        value={name}
      />
    </Modal>
  );
};
