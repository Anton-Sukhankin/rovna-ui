import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Form } from '@rovna-internal/components/components/Form';
import { Button } from '@rovna-internal/components/primitives/Button';

import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Rovna UI/Main/Primitives/Toggle',
  component: Toggle,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch');
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  },
  args: {
    'aria-label': 'Переключить параметр',
    onChange: fn(),
  },
};

export const Small: Story = {
  args: { 'aria-label': 'Переключить параметр', size: 'small' },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Переключить параметр',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    'aria-label': 'Переключить параметр',
    checked: true,
    disabled: true,
  },
};

export const DefaultWithLabel: Story = {
  args: {
    children: "Переключатель",
  },
};

export const GroupHorizontal: Story = {
  render: _args => {
    return (
      <Toggle.Group>
        <Toggle>Темная тема</Toggle>
        <Toggle>Светлая тема</Toggle>
        <Toggle>Синяя тема</Toggle>
      </Toggle.Group>
    );
  },
};

export const GroupVertical: Story = {
  render: _args => {
    return (
      <Toggle.Group layout='vertical'>
        <Toggle>Темная тема</Toggle>
        <Toggle>Светлая тема</Toggle>
        <Toggle>Синяя тема</Toggle>
      </Toggle.Group>
    );
  },
};

export const SmallWithLabel: Story = {
  args: {
    size: 'small',
    children: "Переключатель",
  },
};

export const DefaultWithLongLabel: Story = {
  args: {
    style: {
      width: '200px',
    },
    children: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
  },
};

export const DisabledWithLabel: Story = {
  args: {
    children: "Переключатель",
    disabled: true,
  },
};

export const WithForm: Story = {
  render: _args => {
    return (
      <Form>
        <Form.Item name='toggle-materials' valuePropName='checked'>
          <Toggle>Каменные материалы</Toggle>
        </Form.Item>
      </Form>
    );
  },
};

export const Required: Story = {
  render: _args => {
    return (
      <Form>
        <Form.Item
          label='Материалы'
          rules={[{ required: true, message: 'Поле обязательно' }]}
          name='toggle-materials'
          valuePropName='checked'
        >
          <Toggle>Каменные материалы</Toggle>
        </Form.Item>
        <Form.Item>
          <Button type='submit'>Далее</Button>
        </Form.Item>
      </Form>
    );
  },
};
