import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentPicker } from './ComponentPicker';

const meta: Meta<typeof ComponentPicker> = {
  title: 'Rovna UI/Main/Components/ComponentPicker',
  component: ComponentPicker,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ComponentPicker
      component='input'
      aria-label='Текстовое значение'
      placeholder='Введите значение'
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <ComponentPicker
      component='input'
      aria-label='Недоступное текстовое значение'
      placeholder='Недоступное поле'
      disabled
    />
  ),
};

export const Select: Story = {
  render: () => (
    <ComponentPicker
      component='select'
      aria-label='Выберите этап'
      placeholder='Выберите этап'
      options={[
        { label: 'Новый', value: 'new' },
        { label: 'В работе', value: 'progress' },
        { label: 'Завершен', value: 'done' },
      ]}
    />
  ),
};

export const Checkbox: Story = {
  render: () => (
    <ComponentPicker component='checkbox'>Показывать завершенные</ComponentPicker>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <ComponentPicker
      component='checkbox-group'
      aria-label='Выберите категории'
      options={['Документы', 'Задачи', 'Комментарии']}
    />
  ),
};

export const Radio: Story = {
  render: () => <ComponentPicker component='radio'>Основной вариант</ComponentPicker>,
};

export const RadioGroup: Story = {
  render: () => (
    <ComponentPicker
      component='radio-group'
      aria-label='Выберите приоритет'
      options={['Низкий', 'Средний', 'Высокий']}
    />
  ),
};

export const Toggle: Story = {
  render: () => <ComponentPicker component='toggle'>Включить уведомления</ComponentPicker>,
};

export const DatePicker: Story = {
  render: () => (
    <ComponentPicker component='date-picker' aria-label='Дата выполнения' />
  ),
};

export const RangePicker: Story = {
  render: () => (
    <ComponentPicker
      component='range-picker'
      placeholder={['Дата начала', 'Дата окончания']}
    />
  ),
};
