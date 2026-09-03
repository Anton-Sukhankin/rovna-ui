import React from 'react';
import { Input, Tooltip } from '@rovna-ui/primitives';
import { v4 as uuidv4 } from 'uuid';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { useBoolean } from '@rovna-ui/components/hooks';
import { Form } from '@rovna-ui/components/components/Form';
import { Button, Modal } from '@rovna-ui/components/primitives';

import { useFiltersFormProvider } from '@rovna-internal/filters/core/FiltersFormProvider';

import { useFiltersPresetsProvider } from '../../contexts/FiltersPresetsContext';
import { useNextFilterName } from './useNextFilterName';
import { useValuesObserver } from '../../hooks/useValuesObserver';

const SaveButton = ({ INTERNAL_scope }: { INTERNAL_scope?: string }) => {
  const [form] = Form.useForm<{ name?: string }>();
  const { presets } = useFiltersPresetsProvider('Filters.SaveButton');
  const model = useFiltersFormProvider('Filters.SaveButton');
  const fp = useFiltersPresetsProvider('Filters.SaveButton');
  const [open, toggle] = useBoolean(false);
  const values = useValuesObserver('Filters.SaveButton', model.form, INTERNAL_scope);
  const name = useNextFilterName(presets.map(preset => preset.label));
  const isPresetExist = React.useMemo(
    () =>
      presets.some(
        preset => isEqual(pickBy(values, identity), pickBy(preset.value, identity)),
        [],
      ),
    [presets, values],
  );
  const hasAppliedFilters = React.useMemo(
    () =>
      Object.values(values || {})
        .filter(Boolean)
        .flat().length > 0,
    [values],
  );

  const help = [
    [!hasAppliedFilters, 'Вы не выбрали ни одного фильтра'],
    [isPresetExist, 'Такой набор фильтров уже существует'],
  ] as const;

  const [, title] = help.filter(([condition]) => condition)[0] || [];

  return (
    <>
      <Tooltip title={title}>
        <Button
          data-testid='rovna-ui-filters-save-button'
          disabled={!hasAppliedFilters || isPresetExist}
          variant='link'
          size='small'
          onClick={() => {
            toggle();
          }}
        >
          Сохранить
        </Button>
      </Tooltip>
      <Modal
        data-testid='rovna-ui-filters-save-preset-modal'
        open={open}
        size='small'
        title='Укажите название фильтра'
        cancelButtonProps={{ variant: 'link' }}
        okText='Сохранить фильтр'
        onOk={React.useCallback(() => {
          form.validateFields().then(payload => {
            if (!payload.name) return;
            const value = model.getScopedState();

            fp.onSave({
              id: uuidv4(),
              label: payload.name,
              value,
            });
            toggle();
            form.resetFields();
          });
        }, [form, model, fp, toggle])}
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
                  message: 'Название фильтра обязательно для заполнения',
                },
                {
                  required: true,
                  message: 'Фильтр с таким названием уже существует',
                  validator: () => {
                    const state = form.getFieldsValue();
                    if (!state.name) return Promise.resolve();
                    const isExist = presets
                      .map(preset => preset.label)
                      .includes(state.name);
                    if (!isExist) return Promise.resolve();

                    return Promise.reject();
                  },
                },
              ],
              [form, presets],
            )}
          >
            <Input placeholder='Введите название фильтра' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

SaveButton.displayName = 'Filters.SaveButton';

export { SaveButton };
