import React from 'react';
import { Button, Input } from '@rovna-ui/primitives';
import { v4 as uuidv4 } from 'uuid';
import {
  useBoolean,
  INTERNAL_useMissingName as useMissingName,
} from '@rovna-ui/hooks';
import { Form } from '@rovna-ui/components/components/Form';
import { Modal } from '@rovna-ui/components/primitives';

import { useColumnsSettingsPresetsProvider } from '@rovna-internal/columns-settings/core/contexts/PresetsContext';
import { mapColumnsForPreset } from '@rovna-internal/columns-settings/core/utils/mapColumnsForPreset';
import { ColumnConfig } from '@rovna-internal/columns-settings/core/interfaces/ColumnConfig';

import { SavePresetButtonProps } from './types';

const SavePresetButton = <T extends ColumnConfig = ColumnConfig>({
  columns,
}: SavePresetButtonProps<T>) => {
  const [form] = Form.useForm<{ name?: string }>();
  const model = useColumnsSettingsPresetsProvider('ColumnsSettings.SavePresetButton');
  const [open, toggle] = useBoolean(false);
  const names = model.presets?.map(preset => preset.label) || [];
  const name = useMissingName(names, 'Сохраненные колонки');

  return (
    <>
      <Button
        data-testid='rovna-ui-columns-settings-save-button'
        variant='link'
        size='small'
        onClick={() => {
          toggle();
        }}
      >
        Сохранить
      </Button>
      <Modal
        data-testid='rovna-ui-columns-settings-save-preset-modal'
        open={open}
        size='small'
        title='Укажите название шаблона колонок'
        cancelButtonProps={{ variant: 'link' }}
        okText='Сохранить колонки'
        onOk={React.useCallback(() => {
          form.validateFields().then(payload => {
            if (!payload.name) return;

            const value = mapColumnsForPreset(columns);

            model.settings.getSavePresetHandler()({
              id: uuidv4(),
              label: payload.name,
              value,
            });
            toggle();
            form.resetFields();
          });
        }, [columns, form, model, toggle])}
        onCancel={() => toggle()}
      >
        <Form form={form} initialValues={{ name }}>
          <Form.Item
            required
            name='name'
            rules={React.useMemo(
              () => [
                {
                  required: true,
                  message: 'Название шаблона обязательно для заполнения',
                },
                {
                  required: true,
                  message: 'Шаблон с таким названием уже существует',
                  validator: () => {
                    const state = form.getFieldsValue();
                    if (!state.name) return Promise.resolve();
                    const isExist = model.presets
                      ?.map(preset => preset.label)
                      .includes(state.name);
                    if (!isExist) return Promise.resolve();

                    return Promise.reject();
                  },
                },
              ],
              [form, model.presets],
            )}
          >
            <Input placeholder='Введите название фильтра' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

SavePresetButton.displayName = 'ColumnsSettings.SavePresetButton';

export { SavePresetButton };
