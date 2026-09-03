import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Tag } from '@rovna-ui/components/primitives';
import { argTypes } from '@rovna-ui/tools';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';
import {
  pendingFixture,
  rejectFixture,
  resolveFixture,
  retryFixture,
  timeoutFixture,
  unauthorizedFixture,
} from '@rovna-internal/components/stories/asyncFixtures';

import { Filters } from './Filters';
import { FiltersProps } from './types';
import docs from './docs.json';

const meta: Meta<typeof Filters> = {
  title: 'Rovna UI/Filters/Filters',
  component: Filters,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (props: FiltersProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Открыть
      </Button>
      <Filters
        {...props}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

type AsyncOptionsResponse = {
  results: Array<{ id: number; name: string }>;
};

const localMaterials: AsyncOptionsResponse = {
  results: [
    { id: 1, name: 'Грунт' },
    { id: 2, name: 'Цемент' },
    { id: 3, name: 'Дерево' },
  ],
};

const asyncOptionsArgs = (api: () => Promise<AsyncOptionsResponse>): FiltersProps => ({
  filters: [
    {
      id: 'material',
      name: 'material',
      label: 'Материал',
      component: {
        component: 'async-select',
        preload: ['onmount'],
        api,
      },
    },
  ],
});

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Открыть' }));
    await userEvent.click(await page.findByText('Статус'));
    const checkbox = await page.findByRole('checkbox', { name: 'Предложение' });
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
  render: props => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(props.value ?? {});
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <>
        <Button onClick={() => setOpen(true)}>Открыть</Button>
        <Filters
          {...props}
          open={open}
          value={value}
          onClose={() => setOpen(false)}
          onFilterValuesChange={(changed, values) => {
            setValue(values);
            props.onFilterValuesChange?.(changed, values);
          }}
        />
      </>
    );
  },
  args: {
    onFilterValuesChange: (changed, values) => {
      console.log('[Default][onFilterValuesChange]', changed, values);
    },
    filters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input', allowClear: true },
      },
      {
        id: 'price',
        name: 'price',
        label: 'Цена',
        component: { component: 'input-number' },
      },
      {
        id: 'range-price',
        name: 'range-price',
        label: 'Диапазон',
        component: { component: 'range-input', placeholder: ['От', 'До'] },
      },
      {
        id: 'provider',
        name: 'provider',
        label: 'Поставщик',
        component: {
          component: 'select',
          options: [
            { value: '1', label: 'ООО Интерстрой' },
            { value: '2', label: 'ООО Радуга' },
            { value: '3', label: 'ООО СтройМонтаж' },
          ],
        },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        component: {
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
      {
        id: 'nomenclature',
        name: 'nomenclature',
        label: 'Отсутствует номенклатура',
        component: {
          component: 'checkbox',
          children: 'Отметить, если отсутствует',
        },
      },
      {
        id: 'status',
        name: 'status',
        label: 'Статус',
        component: {
          component: 'checkbox-group',
          options: [
            { value: 'A', label: <Tag>Предложение</Tag> },
            { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
            { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
            { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
            { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
          ],
        },
      },
      {
        id: 'priority',
        name: 'priority',
        label: 'Приоритет',
        component: {
          filterOptionProp: 'label',
          component: 'checkbox-group-search',
          options: [
            { value: 'A', label: 'Приоритет 1' },
            { value: 'B', label: 'Приоритет 2' },
            { value: 'C', label: 'Приоритет 3' },
            { value: 'D', label: 'Приоритет 4' },
            { value: 'E', label: 'Приоритет 5' },
            { value: 'F', label: 'Приоритет 6' },
            { value: 'G', label: 'Приоритет 7' },
            { value: 'H', label: 'Приоритет 8' },
            { value: 'I', label: 'Приоритет 9' },
            { value: 'J', label: 'Приоритет 10' },
          ],
        },
      },
      {
        id: 'comitet',
        name: 'comitet',
        label: 'Комитет',
        component: { component: 'date-picker' },
      },
      {
        id: 'Период',
        name: 'Период',
        label: 'Комитет',
        component: { component: 'range-picker' },
      },
      {
        id: 'some-filter-name',
        name: 'some-filter-name',
        label: 'Не придумал фильтр',
        component: { component: 'radio', children: 'Надпись рядом' },
      },
      {
        id: 'payment',
        name: 'payment',
        label: 'Тип оплаты',
        component: {
          component: 'radio-group',
          options: ['Наличными', 'Картой', 'СБП'],
        },
      },
    ],
  },
};

export const KeyboardAccessibility: Story = {
  args: {
    filters: [
      {
        id: 'status',
        name: 'status',
        label: 'Статус',
        component: {
          component: 'checkbox',
          children: 'Только активные',
        },
      },
    ],
  },
  render: Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Открыть' });

    trigger.focus();
    await userEvent.keyboard('{Enter}');
    const dialog = await page.findByRole('dialog', { name: 'Фильтрация таблицы' });
    const closeButton = within(dialog).getByRole('button', { name: 'Закрыть' });
    closeButton.focus();
    await userEvent.tab();
    await expect(trigger).not.toHaveFocus();
    const activeElement = canvasElement.ownerDocument.activeElement;
    await expect(activeElement).toBeInstanceOf(HTMLElement);
    fireEvent.keyDown(activeElement as HTMLElement, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      which: 27,
    });
    await waitFor(() => expect(dialog).not.toBeVisible(), { timeout: 5_000 });
    await waitFor(() => expect(trigger).toHaveFocus(), { timeout: 5_000 });
  },
};

export const Requires: Story = {
  render: props => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [open, setOpen] = React.useState(false);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <>
        <Button onClick={() => setOpen(true)}>Открыть</Button>
        <Filters open={open} filters={props.filters} onClose={() => setOpen(false)} />
      </>
    );
  },
  args: {
    onFilterValuesChange: (changed, values) => {
      console.log('[Requires][onFilterValuesChange]', changed, values);
    },
    filters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input' },
      },
      {
        id: 'provider',
        name: 'provider',
        label: 'Поставщик',
        requires: ['number'],
        component: {
          component: 'select',
          options: [
            { value: '1', label: 'ООО Интерстрой' },
            { value: '2', label: 'ООО Радуга' },
            { value: '3', label: 'ООО СтройМонтаж' },
          ],
        },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        requires: ['provider'],
        component: {
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
      {
        id: 'nomenclature',
        name: 'nomenclature',
        label: 'Отсутствует номенклатура',
        requires: ['material'],
        component: {
          component: 'checkbox',
          children: 'Отметить, если отсутствует',
        },
      },
      {
        id: 'status',
        name: 'status',
        label: 'Статус',
        requires: ['nomenclature'],
        component: {
          component: 'checkbox-group',
          options: [
            { value: 'A', label: <Tag>Предложение</Tag> },
            { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
            { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
            { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
            { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
          ],
        },
      },
      {
        id: 'comitet',
        name: 'comitet',
        label: 'Комитет',
        requires: ['status'],
        component: { component: 'date-picker' },
      },
      {
        id: 'Период',
        name: 'Период',
        label: 'Комитет',
        requires: ['comitet'],
        component: { component: 'range-picker' },
      },
      {
        id: 'some-filter-name',
        name: 'some-filter-name',
        label: 'Не придумал фильтр',
        requires: ['period'],
        component: { component: 'radio', children: 'Надпись рядом' },
      },
      {
        id: 'payment',
        name: 'payment',
        label: 'Тип оплаты',
        component: {
          component: 'radio-group',
          options: ['Наличными', 'Картой', 'СБП'],
        },
      },
    ],
  },
};

export const Depends: Story = {
  render: props => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [open, setOpen] = React.useState(false);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <>
        <Button onClick={() => setOpen(true)}>Открыть</Button>
        <Filters open={open} filters={props.filters} onClose={() => setOpen(false)} />
      </>
    );
  },
  args: {
    onFilterValuesChange: (changed, values) => {
      console.log('[Depends][onFilterValuesChange]', changed, values);
    },
    filters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input' },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        depends: ['number'],
        component: {
          preload: ['onmount'],
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
    ],
  },
};

export const Loading: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Открыть' }));
    const spinners = await page.findAllByTestId('rovna-ui-spinner');
    await expect(spinners.some(spinner => spinner.querySelector('svg'))).toBe(true);
  },
  args: {
    onFilterValuesChange: (changed, values) => {
      console.log('[Loading][onFilterValuesChange]', changed, values);
    },
    loading: true,
    filters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input', allowClear: true },
      },
      {
        id: 'price',
        name: 'price',
        label: 'Цена',
        component: { component: 'input-number' },
      },
      {
        id: 'range-price',
        name: 'range-price',
        label: 'Диапазон',
        component: { component: 'range-input', placeholder: ['От', 'До'] },
      },
      {
        id: 'provider',
        name: 'provider',
        label: 'Поставщик',
        component: {
          component: 'select',
          options: [
            { value: '1', label: 'ООО Интерстрой' },
            { value: '2', label: 'ООО Радуга' },
            { value: '3', label: 'ООО СтройМонтаж' },
          ],
        },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        component: {
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
      {
        id: 'nomenclature',
        name: 'nomenclature',
        label: 'Отсутствует номенклатура',
        component: {
          component: 'checkbox',
          children: 'Отметить, если отсутствует',
        },
      },
      {
        id: 'status',
        name: 'status',
        label: 'Статус',
        component: {
          component: 'checkbox-group',
          options: [
            { value: 'A', label: <Tag>Предложение</Tag> },
            { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
            { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
            { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
            { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
          ],
        },
      },
      {
        id: 'priority',
        name: 'priority',
        label: 'Приоритет',
        component: {
          filterOptionProp: 'label',
          component: 'checkbox-group-search',
          options: [
            { value: 'A', label: 'Приоритет 1' },
            { value: 'B', label: 'Приоритет 2' },
            { value: 'C', label: 'Приоритет 3' },
            { value: 'D', label: 'Приоритет 4' },
            { value: 'E', label: 'Приоритет 5' },
            { value: 'F', label: 'Приоритет 6' },
            { value: 'G', label: 'Приоритет 7' },
            { value: 'H', label: 'Приоритет 8' },
            { value: 'I', label: 'Приоритет 9' },
            { value: 'J', label: 'Приоритет 10' },
          ],
        },
      },
      {
        id: 'comitet',
        name: 'comitet',
        label: 'Комитет',
        component: { component: 'date-picker' },
      },
      {
        id: 'Период',
        name: 'Период',
        label: 'Комитет',
        component: { component: 'range-picker' },
      },
      {
        id: 'some-filter-name',
        name: 'some-filter-name',
        label: 'Не придумал фильтр',
        component: { component: 'radio', children: 'Надпись рядом' },
      },
      {
        id: 'payment',
        name: 'payment',
        label: 'Тип оплаты',
        component: {
          component: 'radio-group',
          options: ['Наличными', 'Картой', 'СБП'],
        },
      },
    ],
  },
  render: props => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [open, setOpen] = React.useState(false);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <>
        <Button onClick={() => setOpen(true)}>Открыть</Button>
        <Filters {...props} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};

export const AsyncOptionsSuccess: Story = {
  render: Template,
  args: asyncOptionsArgs(() => resolveFixture(localMaterials)),
};

export const AsyncOptionsEmpty: Story = {
  render: Template,
  args: asyncOptionsArgs(() => resolveFixture({ results: [] })),
};

export const AsyncOptionsError: Story = {
  render: Template,
  args: asyncOptionsArgs(() => rejectFixture(new Error('Локальная ошибка'))),
};

export const AsyncOptionsLoading: Story = {
  render: Template,
  args: asyncOptionsArgs(() => pendingFixture()),
};

export const AsyncOptionsUnauthorized: Story = {
  render: Template,
  args: asyncOptionsArgs(() => unauthorizedFixture()),
};

export const AsyncOptionsTimeout: Story = {
  render: Template,
  args: asyncOptionsArgs(() => timeoutFixture()),
};

export const AsyncOptionsRetry: Story = {
  render: Template,
  args: asyncOptionsArgs(retryFixture(localMaterials)),
  parameters: {
    docs: {
      description: {
        story: 'Первая загрузка отклоняется, повторное открытие фильтров получает локальные данные.',
      },
    },
  },
};

export const Composition: Story = {
  args: {
    onFilterValuesChange: (changed, values) => {
      console.log('[Composition][onFilterValuesChange]', changed, values);
    },
    filters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input', allowClear: true },
      },
      {
        id: 'provider',
        name: 'provider',
        label: 'Поставщик',
        component: {
          component: 'select',
          options: [
            { value: '1', label: 'ООО Интерстрой' },
            { value: '2', label: 'ООО Радуга' },
            { value: '3', label: 'ООО СтройМонтаж' },
          ],
        },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        component: {
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
      {
        id: 'nomenclature',
        name: 'nomenclature',
        label: 'Отсутствует номенклатура',
        component: {
          component: 'checkbox',
          children: 'Отметить, если отсутствует',
        },
      },
      {
        id: 'status',
        name: 'status',
        label: 'Статус',
        component: {
          component: 'checkbox-group',
          options: [
            { value: 'A', label: <Tag>Предложение</Tag> },
            { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
            { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
            { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
            { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
          ],
        },
      },
      {
        id: 'priority',
        name: 'priority',
        label: 'Приоритет',
        component: {
          component: 'async-checkbox',
          api: () =>
            resolveFixture({
              results: [
                { id: 'A', name: 'Критический' },
                { id: 'B', name: 'Высокий' },
                { id: 'C', name: 'Обычный' },
                { id: 'D', name: 'Низкий' },
              ],
            }),
        },
      },
      {
        id: 'comitet',
        name: 'comitet',
        label: 'Комитет',
        component: { component: 'date-picker' },
      },
      {
        id: 'Период',
        name: 'Период',
        label: 'Комитет',
        component: { component: 'range-picker' },
      },
      {
        id: 'some-filter-name',
        name: 'some-filter-name',
        label: 'Не придумал фильтр',
        component: { component: 'radio', children: 'Надпись рядом' },
      },
      {
        id: 'payment',
        name: 'payment',
        label: 'Тип оплаты',
        component: {
          component: 'radio-group',
          options: ['Наличными', 'Картой', 'СБП'],
        },
      },
    ],
  },
  render: args => (
    <Filters.Root {...args}>
      <Filters.Form>
        <Filters.CollapseGroup defaultOpen={['number', 'comitet']}>
          <Filters.List>
            {args.filters.map(filter => (
              <Filters.Filter key={filter.key} filter={filter} />
            ))}
          </Filters.List>
        </Filters.CollapseGroup>
      </Filters.Form>
    </Filters.Root>
  ),
};

const DebounceCode = `
<Filters
  debounce
  filters={[
    { name: 'number', component: 'input', label: 'Номер' },
    {
      name: 'provider',
      component: 'select',
      label: 'Поставщик',
      options: [
        { value: '1', label: 'ООО Интерстрой' },
        { value: '2', label: 'ООО Радуга' },
        { value: '3', label: 'ООО СтройМонтаж' },
      ],
    },
    {
      name: 'material',
      component: 'async-select',
      label: 'Материал',
      api: '/api/materials/',
    },
    {
      name: 'nomenclature',
      component: 'checkbox',
      label: 'Отсутствует номенклатура',
      children: 'Отметить, если отсутствует',
    },
    {
      name: 'status',
      component: 'checkbox-group',
      label: 'Статус',
      options: [
        { value: 'A', label: <Tag>Предложение</Tag> },
        { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
        { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
        { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
        { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
      ],
    },
    {
      name: 'comitet',
      component: 'datepicker',
      label: 'Комитет',
    },
    {
      name: 'Период',
      component: 'rangepicker',
      label: 'Комитет',
    },
    {
      name: 'payment',
      component: 'radio',
      label: 'Не придумал фильтр',
      children: 'Надпись рядом',
    },
    {
      name: 'payment',
      component: 'radio-group',
      label: 'Тип оплаты',
      options: ['Наличными', 'Картой', 'СБП'],
    },
  ]}
/>
`;
export const Debounce: Story = {
  args: {
    onFilterValuesChange: (changed, values) => {
      console.log('[Debounce][onFilterValuesChange]');
      console.log(changed);
      console.log(values);
    },
    debounce: true,
    filters: [
      { id: 'number', name: 'number', label: 'Номер', component: { component: 'input' } },
      {
        id: 'provider',
        name: 'provider',
        label: 'Поставщик',
        component: {
          component: 'select',
          options: [
            { value: '1', label: 'ООО Интерстрой' },
            { value: '2', label: 'ООО Радуга' },
            { value: '3', label: 'ООО СтройМонтаж' },
          ],
        },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        component: {
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
      {
        id: 'nomenclature',
        name: 'nomenclature',
        label: 'Отсутствует номенклатура',
        component: {
          component: 'checkbox',
          children: 'Отметить, если отсутствует',
        },
      },
      {
        id: 'status',
        name: 'status',
        label: 'Статус',
        component: {
          component: 'checkbox-group',
          options: [
            { value: 'A', label: <Tag>Предложение</Tag> },
            { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
            { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
            { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
            { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
          ],
        },
      },
      {
        id: 'comitet',
        name: 'comitet',
        label: 'Комитет',
        component: { component: 'date-picker' },
      },
      {
        id: 'Период',
        name: 'Период',
        label: 'Комитет',
        component: { component: 'range-picker' },
      },
      {
        id: 'some-filter-name',
        name: 'some-filter-name',
        label: 'Не придумал фильтр',
        component: { component: 'radio', children: 'Надпись рядом' },
      },
      {
        id: 'payment',
        name: 'payment',
        label: 'Тип оплаты',
        component: {
          component: 'radio-group',
          options: ['Наличными', 'Картой', 'СБП'],
        },
      },
    ],
  },
  render: props => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [open, setOpen] = React.useState(false);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <>
        <Button onClick={() => setOpen(true)}>Открыть</Button>
        <Filters
          {...props}
          open={open}
          filters={props.filters}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      source: {
        code: DebounceCode,
      },
    },
  },
};

const PresetsCode = `
<Filters
  showPresets
  filters={[
    { id: 'number', name: 'number', label: 'Номер', component: { component: 'input' } },
    { id: 'price', name: 'price', label: 'Цена', component: { component: 'input-number' } },
    {
      id: 'provider',
      name: 'provider',
      label: 'Поставщик',
      component: {
        component: 'select',
        options: [
          { value: '1', label: 'ООО Интерстрой' },
          { value: '2', label: 'ООО Радуга' },
          { value: '3', label: 'ООО СтройМонтаж' },
        ],
      },
    },
    {
      id: 'material',
      name: 'material',
      label: 'Материал',
      component: {
        component: 'async-select',
        api: '/api/example/'
        },
      },
    },
    {
      id: 'nomenclature',
      name: 'nomenclature',
      label: 'Отсутствует номенклатура',
      component: {
        component: 'checkbox',
        children: 'Отметить, если отсутствует',
      },
    },
    {
      id: 'status',
      name: 'status',
      label: 'Статус',
      component: {
        component: 'checkbox-group',
        options: [
          { value: 'A', label: <Tag>Предложение</Tag> },
          { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
          { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
          { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
          { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
        ],
      },
    },
    {
      id: 'priority',
      name: 'priority',
      label: 'Приоритет',
      component: {
        component: 'async-checkbox',
        api: '/api/example/',
      },
    },
    {
      id: 'comitet',
      name: 'comitet',
      label: 'Комитет',
      component: { component: 'date-picker' },
    },
    {
      id: 'Период',
      name: 'Период',
      label: 'Комитет',
      component: { component: 'range-picker' },
    },
    {
      id: 'some-filter-name',
      name: 'some-filter-name',
      label: 'Не придумал фильтр',
      component: { component: 'radio', children: 'Надпись рядом' },
    },
    {
      id: 'payment',
      name: 'payment',
      label: 'Тип оплаты',
      component: {
        component: 'radio-group',
        options: ['Наличными', 'Картой', 'СБП'],
      },
    },
  ]}
/>
`;
export const Presets: Story = {
  parameters: {
    docs: {
      source: {
        code: PresetsCode,
      },
    },
  },
  args: {
    localStorage: 'rovna-ui-presets-story',
    showPresets: true,
    onPresetRemove: preset => {
      console.log('[Presets][onPresetRemove]', preset);
    },
    onPresetEdit: preset => {
      console.log('[Presets][onPresetEdit]', preset);
    },
    onPresetSave: preset => {
      console.log('[Presets][onPresetSave]', preset);
    },
    onPresetsChange: presets => {
      console.log('[Presets][onPresetsChange]', presets);
    },
    onPresetApply: preset => {
      console.log('[Presets][onPresetApply]', preset);
    },
    onFilterValuesChange: (changed, values) => {
      console.log('[Presets][onFilterValuesChange]');
      console.log(changed);
      console.log(values);
    },
    filters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input', allowClear: true },
      },
      {
        id: 'price',
        name: 'price',
        label: 'Цена',
        component: { component: 'input-number' },
      },
      {
        id: 'provider',
        name: 'provider',
        label: 'Поставщик',
        component: {
          component: 'select',
          options: [
            { value: '1', label: 'ООО Интерстрой' },
            { value: '2', label: 'ООО Радуга' },
            { value: '3', label: 'ООО СтройМонтаж' },
          ],
        },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        component: {
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
      {
        id: 'nomenclature',
        name: 'nomenclature',
        label: 'Отсутствует номенклатура',
        component: {
          component: 'checkbox',
          children: 'Отметить, если отсутствует',
        },
      },
      {
        id: 'status',
        name: 'status',
        label: 'Статус',
        component: {
          component: 'checkbox-group',
          options: [
            { value: 'A', label: <Tag>Предложение</Tag> },
            { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
            { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
            { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
            { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
          ],
        },
      },
      {
        id: 'priority',
        name: 'priority',
        label: 'Приоритет',
        component: {
          filterOptionProp: 'label',
          component: 'checkbox-group-search',
          options: [
            { value: 'A', label: 'Приоритет 1' },
            { value: 'B', label: 'Приоритет 2' },
            { value: 'C', label: 'Приоритет 3' },
            { value: 'D', label: 'Приоритет 4' },
            { value: 'E', label: 'Приоритет 5' },
            { value: 'F', label: 'Приоритет 6' },
            { value: 'G', label: 'Приоритет 7' },
            { value: 'H', label: 'Приоритет 8' },
            { value: 'I', label: 'Приоритет 9' },
            { value: 'J', label: 'Приоритет 10' },
          ],
        },
      },
      {
        id: 'comitet',
        name: 'comitet',
        label: 'Комитет',
        component: { component: 'date-picker' },
      },
      {
        id: 'Период',
        name: 'Период',
        label: 'Комитет',
        component: { component: 'range-picker' },
      },
      {
        id: 'some-filter-name',
        name: 'some-filter-name',
        label: 'Не придумал фильтр',
        component: { component: 'radio', children: 'Надпись рядом' },
      },
      {
        id: 'payment',
        name: 'payment',
        label: 'Тип оплаты',
        component: {
          component: 'radio-group',
          options: ['Наличными', 'Картой', 'СБП'],
        },
      },
    ],
  },
  render: Template,
};

export const ShowApplyButton: Story = {
  args: {
    showApplyButton: true,
    onFilterValuesFinish: values => {
      console.log('[Default][onFilterValuesFinish]');
      console.log(values);
    },
    filters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input', allowClear: true },
      },
      {
        id: 'price',
        name: 'price',
        label: 'Цена',
        component: { component: 'input-number' },
      },
      {
        id: 'range-price',
        name: 'range-price',
        label: 'Диапазон',
        component: { component: 'range-input', placeholder: ['От', 'До'] },
      },
      {
        id: 'provider',
        name: 'provider',
        label: 'Поставщик',
        component: {
          component: 'select',
          options: [
            { value: '1', label: 'ООО Интерстрой' },
            { value: '2', label: 'ООО Радуга' },
            { value: '3', label: 'ООО СтройМонтаж' },
          ],
        },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        component: {
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
      {
        id: 'nomenclature',
        name: 'nomenclature',
        label: 'Отсутствует номенклатура',
        component: {
          component: 'checkbox',
          children: 'Отметить, если отсутствует',
        },
      },
      {
        id: 'status',
        name: 'status',
        label: 'Статус',
        component: {
          component: 'checkbox-group',
          options: [
            { value: 'A', label: <Tag>Предложение</Tag> },
            { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
            { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
            { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
            { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
          ],
        },
      },
      {
        id: 'priority',
        name: 'priority',
        label: 'Приоритет',
        component: {
          filterOptionProp: 'label',
          component: 'checkbox-group-search',
          options: [
            { value: 'A', label: 'Приоритет 1' },
            { value: 'B', label: 'Приоритет 2' },
            { value: 'C', label: 'Приоритет 3' },
            { value: 'D', label: 'Приоритет 4' },
            { value: 'E', label: 'Приоритет 5' },
            { value: 'F', label: 'Приоритет 6' },
            { value: 'G', label: 'Приоритет 7' },
            { value: 'H', label: 'Приоритет 8' },
            { value: 'I', label: 'Приоритет 9' },
            { value: 'J', label: 'Приоритет 10' },
          ],
        },
      },
      {
        id: 'comitet',
        name: 'comitet',
        label: 'Комитет',
        component: { component: 'date-picker' },
      },
      {
        id: 'Период',
        name: 'Период',
        label: 'Комитет',
        component: { component: 'range-picker' },
      },
      {
        id: 'some-filter-name',
        name: 'some-filter-name',
        label: 'Не придумал фильтр',
        component: { component: 'radio', children: 'Надпись рядом' },
      },
      {
        id: 'payment',
        name: 'payment',
        label: 'Тип оплаты',
        component: {
          component: 'radio-group',
          options: ['Наличными', 'Картой', 'СБП'],
        },
      },
    ],
  },
  render: Template,
};

const LocalStoragePresetsCode = `
<Filters
  showPresets
  localStorage='rovna-ui-filters-presets'
  filters={[
    { id: 'number', name: 'number', label: 'Номер', component: { component: 'input' } },
    { id: 'price', name: 'price', label: 'Цена', component: { component: 'input-number' } },
    {
      id: 'provider',
      name: 'provider',
      label: 'Поставщик',
      component: {
        component: 'select',
        options: [
          { value: '1', label: 'ООО Интерстрой' },
          { value: '2', label: 'ООО Радуга' },
          { value: '3', label: 'ООО СтройМонтаж' },
        ],
      },
    },
    {
      id: 'material',
      name: 'material',
      label: 'Материал',
      component: {
        component: 'async-select',
        api: '/api/example/'
        },
      },
    },
    {
      id: 'nomenclature',
      name: 'nomenclature',
      label: 'Отсутствует номенклатура',
      component: {
        component: 'checkbox',
        children: 'Отметить, если отсутствует',
      },
    },
    {
      id: 'status',
      name: 'status',
      label: 'Статус',
      component: {
        component: 'checkbox-group',
        options: [
          { value: 'A', label: <Tag>Предложение</Tag> },
          { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
          { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
          { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
          { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
        ],
      },
    },
    {
      id: 'priority',
      name: 'priority',
      label: 'Приоритет',
      component: {
        component: 'async-checkbox',
        api: '/api/example/',
      },
    },
    {
      id: 'comitet',
      name: 'comitet',
      label: 'Комитет',
      component: { component: 'date-picker' },
    },
    {
      id: 'Период',
      name: 'Период',
      label: 'Комитет',
      component: { component: 'range-picker' },
    },
    {
      id: 'some-filter-name',
      name: 'some-filter-name',
      label: 'Не придумал фильтр',
      component: { component: 'radio', children: 'Надпись рядом' },
    },
    {
      id: 'payment',
      name: 'payment',
      label: 'Тип оплаты',
      component: {
        component: 'radio-group',
        options: ['Наличными', 'Картой', 'СБП'],
      },
    },
  ]}
/>
`;
export const LocalStoragePresets: Story = {
  parameters: {
    docs: {
      source: {
        code: LocalStoragePresetsCode,
      },
    },
  },
  args: {
    localStorage: 'rovna-ui-filters-presets',
    showPresets: true,
    onPresetRemove: preset => {
      console.log('[Presets][onPresetRemove]', preset);
    },
    onPresetEdit: preset => {
      console.log('[Presets][onPresetEdit]', preset);
    },
    onPresetSave: preset => {
      console.log('[Presets][onPresetSave]', preset);
    },
    onPresetsChange: presets => {
      console.log('[Presets][onPresetsChange]', presets);
    },
    onPresetApply: preset => {
      console.log('[Presets][onPresetApply]', preset);
    },
    onFilterValuesChange: (changed, values) => {
      console.log('[Presets][onFilterValuesChange]');
      console.log(changed);
      console.log(values);
    },
    filters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input', allowClear: true },
      },
      {
        id: 'price',
        name: 'price',
        label: 'Цена',
        component: { component: 'input-number' },
      },
      {
        id: 'provider',
        name: 'provider',
        label: 'Поставщик',
        component: {
          component: 'select',
          options: [
            { value: '1', label: 'ООО Интерстрой' },
            { value: '2', label: 'ООО Радуга' },
            { value: '3', label: 'ООО СтройМонтаж' },
          ],
        },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        component: {
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
      {
        id: 'nomenclature',
        name: 'nomenclature',
        label: 'Отсутствует номенклатура',
        component: {
          component: 'checkbox',
          children: 'Отметить, если отсутствует',
        },
      },
      {
        id: 'status',
        name: 'status',
        label: 'Статус',
        component: {
          component: 'checkbox-group',
          options: [
            { value: 'A', label: <Tag>Предложение</Tag> },
            { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
            { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
            { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
            { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
          ],
        },
      },
      {
        id: 'priority',
        name: 'priority',
        label: 'Приоритет',
        component: {
          filterOptionProp: 'label',
          component: 'checkbox-group-search',
          options: [
            { value: 'A', label: 'Приоритет 1' },
            { value: 'B', label: 'Приоритет 2' },
            { value: 'C', label: 'Приоритет 3' },
            { value: 'D', label: 'Приоритет 4' },
            { value: 'E', label: 'Приоритет 5' },
            { value: 'F', label: 'Приоритет 6' },
            { value: 'G', label: 'Приоритет 7' },
            { value: 'H', label: 'Приоритет 8' },
            { value: 'I', label: 'Приоритет 9' },
            { value: 'J', label: 'Приоритет 10' },
          ],
        },
      },
      {
        id: 'comitet',
        name: 'comitet',
        label: 'Комитет',
        component: { component: 'date-picker' },
      },
      {
        id: 'Период',
        name: 'Период',
        label: 'Комитет',
        component: { component: 'range-picker' },
      },
      {
        id: 'some-filter-name',
        name: 'some-filter-name',
        label: 'Не придумал фильтр',
        component: { component: 'radio', children: 'Надпись рядом' },
      },
      {
        id: 'payment',
        name: 'payment',
        label: 'Тип оплаты',
        component: {
          component: 'radio-group',
          options: ['Наличными', 'Картой', 'СБП'],
        },
      },
    ],
  },
  render: Template,
};

const InternationalizationCode = `
<Filters
  filters={[
      { id: 'number', name: 'number', label: 'Номер', component: { component: 'input' } },
      {
        id: 'provider',
        name: 'provider',
        label: 'Поставщик',
        component: {
          component: 'select',
          options: [
            { value: '1', label: 'ООО Интерстрой' },
            { value: '2', label: 'ООО Радуга' },
            { value: '3', label: 'ООО СтройМонтаж' },
          ],
        },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        component: {
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
      {
        id: 'nomenclature',
        name: 'nomenclature',
        label: 'Отсутствует номенклатура',
        component: {
          component: 'checkbox',
          children: 'Отметить, если отсутствует',
        },
      },
      {
        id: 'status',
        name: 'status',
        label: 'Статус',
        component: {
          component: 'checkbox-group',
          options: [
            { value: 'A', label: <Tag>Предложение</Tag> },
            { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
            { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
            { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
            { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
          ],
        },
      },
      {
        id: 'comitet',
        name: 'comitet',
        label: 'Комитет',
        component: { component: 'date-picker' },
      },
      {
        id: 'Период',
        name: 'Период',
        label: 'Комитет',
        component: { component: 'range-picker' },
      },
      {
        id: 'some-filter-name',
        name: 'some-filter-name',
        label: 'Не придумал фильтр',
        component: { component: 'radio', children: 'Надпись рядом' },
      },
      {
        id: 'payment',
        name: 'payment',
        label: 'Тип оплаты',
        component: {
          component: 'radio-group',
          options: ['Наличными', 'Картой', 'СБП'],
        },
      },
    ]}}
/>
`;
export const Internationalization: Story = {
  args: {
    onFilterValuesChange: (changed, values) => {
      console.log('[Internationalization][onFilterValuesChange]');
      console.log(changed);
      console.log(values);
    },
    filters: [
      {
        id: 'number',
        name: 'number',
        label: "Номер",
        component: { component: 'input' },
      },
      {
        id: 'provider',
        name: 'provider',
        label: "Поставщик",
        component: {
          component: 'select',
          options: [
            { value: '1', label: 'ООО Interstroy' },
            { value: '2', label: 'ООО Raduga' },
            { value: '3', label: 'ООО StroyMontazh' },
          ],
        },
      },
      {
        id: 'material',
        name: 'material',
        label: "Материал",
        component: {
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
      {
        id: 'nomenclature',
        name: 'nomenclature',
        label: "Без номенклатуры",
        component: {
          component: 'checkbox',
          children: 'Отметить, если отсутствует',
        },
      },
      {
        id: 'status',
        name: 'status',
        label: "Статус",
        component: {
          component: 'checkbox-group',
          options: [
            { value: 'A', label: <Tag>Предложение</Tag> },
            { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
            { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
            { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
            { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
          ],
        },
      },
      {
        id: 'comitet',
        name: 'comitet',
        label: "Комитет",
        component: { component: 'date-picker' },
      },
      {
        id: 'Период',
        name: 'Период',
        label: "Период",
        component: { component: 'range-picker' },
      },
      {
        id: 'some-filter-name',
        name: 'some-filter-name',
        label: "Дополнительный фильтр",
        component: { component: 'radio', children: "Вариант" },
      },
      {
        id: 'payment',
        name: 'payment',
        label: "Оплата",
        component: {
          component: 'radio-group',
          options: ['Наличные', 'Карта', 'СБП'],
        },
      },
    ],
  },
  render: Template,
  parameters: {
    docs: {
      source: {
        code: InternationalizationCode,
      },
    },
  },
};

export const INTERNALScopeDefault: Story = {
  args: {
    INTERNAL_scope: 'filters',
    onFilterValuesChange: (changed, values) => {
      console.log('[INTERNAL_Scope][onFilterValuesChange]');
      console.log(changed);
      console.log(values);
    },
    filters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input', allowClear: true },
      },
      {
        id: 'price',
        name: 'price',
        label: 'Цена',
        requires: ['number'],
        component: { component: 'input-number' },
      },
      {
        id: 'provider',
        name: 'provider',
        label: 'Поставщик',
        component: {
          component: 'select',
          options: [
            { value: '1', label: 'ООО Интерстрой' },
            { value: '2', label: 'ООО Радуга' },
            { value: '3', label: 'ООО СтройМонтаж' },
          ],
        },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        component: {
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
      {
        id: 'nomenclature',
        name: 'nomenclature',
        label: 'Отсутствует номенклатура',
        component: {
          component: 'checkbox',
          children: 'Отметить, если отсутствует',
        },
      },
      {
        id: 'status',
        name: 'status',
        label: 'Статус',
        component: {
          component: 'checkbox-group',
          options: [
            { value: 'A', label: <Tag>Предложение</Tag> },
            { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
            { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
            { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
            { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
          ],
        },
      },
      {
        id: 'priority',
        name: 'priority',
        label: 'Приоритет',
        component: {
          filterOptionProp: 'label',
          component: 'checkbox-group-search',
          options: [
            { value: 'A', label: 'Приоритет 1' },
            { value: 'B', label: 'Приоритет 2' },
            { value: 'C', label: 'Приоритет 3' },
            { value: 'D', label: 'Приоритет 4' },
            { value: 'E', label: 'Приоритет 5' },
            { value: 'F', label: 'Приоритет 6' },
            { value: 'G', label: 'Приоритет 7' },
            { value: 'H', label: 'Приоритет 8' },
            { value: 'I', label: 'Приоритет 9' },
            { value: 'J', label: 'Приоритет 10' },
          ],
        },
      },
      {
        id: 'comitet',
        name: 'comitet',
        label: 'Комитет',
        component: { component: 'date-picker' },
      },
      {
        id: 'Период',
        name: 'Период',
        label: 'Комитет',
        component: { component: 'range-picker' },
      },
      {
        id: 'some-filter-name',
        name: 'some-filter-name',
        label: 'Не придумал фильтр',
        component: { component: 'radio', children: 'Надпись рядом' },
      },
      {
        id: 'payment',
        name: 'payment',
        label: 'Тип оплаты',
        component: {
          component: 'radio-group',
          options: ['Наличными', 'Картой', 'СБП'],
        },
      },
    ],
  },
  render: Template,
};
export const INTERNALScopeDepends: Story = {
  args: {
    INTERNAL_scope: 'filters',
    onFilterValuesChange: (changed, values) => {
      console.log('[Depends][onFilterValuesChange]');
      console.log(changed);
      console.log(values);
    },
    filters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input' },
      },
      {
        id: "Название",
        name: "Название",
        label: 'Имя',
        depends: ['number'],
        component: { component: 'input' },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        depends: ['number'],
        component: {
          preload: ['onmount'],
          component: 'async-select',
          api: payload => {
            console.log('[INTERNALScopeDepends]', payload);

            return resolveFixture(localMaterials);
          },
        },
      },
    ],
  },
  render: Template,
};
export const INTERNALScopePresets: Story = {
  args: {
    INTERNAL_scope: 'filters',
    showPresets: true,
    onPresetRemove: preset => {
      console.log('[Presets][onPresetRemove]', preset);
    },
    onPresetEdit: preset => {
      console.log('[Presets][onPresetEdit]', preset);
    },
    onPresetSave: preset => {
      console.log('[Presets][onPresetSave]', preset);
    },
    onPresetsChange: presets => {
      console.log('[Presets][onPresetsChange]', presets);
    },
    onFilterValuesChange: (changed, values) => {
      console.log('[Presets][onFilterValuesChange]');
      console.log(changed);
      console.log(values);
    },
    filters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input', allowClear: true },
      },
      {
        id: 'price',
        name: 'price',
        label: 'Цена',
        component: { component: 'input-number' },
      },
      {
        id: 'provider',
        name: 'provider',
        label: 'Поставщик',
        component: {
          component: 'select',
          options: [
            { value: '1', label: 'ООО Интерстрой' },
            { value: '2', label: 'ООО Радуга' },
            { value: '3', label: 'ООО СтройМонтаж' },
          ],
        },
      },
      {
        id: 'material',
        name: 'material',
        label: 'Материал',
        component: {
          component: 'async-select',
          api: () => resolveFixture(localMaterials),
        },
      },
      {
        id: 'nomenclature',
        name: 'nomenclature',
        label: 'Отсутствует номенклатура',
        component: {
          component: 'checkbox',
          children: 'Отметить, если отсутствует',
        },
      },
      {
        id: 'status',
        name: 'status',
        label: 'Статус',
        component: {
          component: 'checkbox-group',
          options: [
            { value: 'A', label: <Tag>Предложение</Tag> },
            { value: 'B', label: <Tag preset='blue'>Переторжка</Tag> },
            { value: 'C', label: <Tag preset='yellow'>Подведение итогов</Tag> },
            { value: 'D', label: <Tag preset='green'>Завершен</Tag> },
            { value: 'E', label: <Tag preset='red'>Отменен</Tag> },
          ],
        },
      },
      {
        id: 'priority',
        name: 'priority',
        label: 'Приоритет',
        component: {
          filterOptionProp: 'label',
          component: 'checkbox-group-search',
          options: [
            { value: 'A', label: 'Приоритет 1' },
            { value: 'B', label: 'Приоритет 2' },
            { value: 'C', label: 'Приоритет 3' },
            { value: 'D', label: 'Приоритет 4' },
            { value: 'E', label: 'Приоритет 5' },
            { value: 'F', label: 'Приоритет 6' },
            { value: 'G', label: 'Приоритет 7' },
            { value: 'H', label: 'Приоритет 8' },
            { value: 'I', label: 'Приоритет 9' },
            { value: 'J', label: 'Приоритет 10' },
          ],
        },
      },
      {
        id: 'comitet',
        name: 'comitet',
        label: 'Комитет',
        component: { component: 'date-picker' },
      },
      {
        id: 'Период',
        name: 'Период',
        label: 'Комитет',
        component: { component: 'range-picker' },
      },
      {
        id: 'some-filter-name',
        name: 'some-filter-name',
        label: 'Не придумал фильтр',
        component: { component: 'radio', children: 'Надпись рядом' },
      },
      {
        id: 'payment',
        name: 'payment',
        label: 'Тип оплаты',
        component: {
          component: 'radio-group',
          options: ['Наличными', 'Картой', 'СБП'],
        },
      },
    ],
  },
  render: Template,
};
