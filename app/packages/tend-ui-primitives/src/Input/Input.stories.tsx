import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccountBox, Home } from '@rovna-ui/icons';
import { expect, userEvent, within } from 'storybook/test';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Rovna UI/Primitives/Input',
  component: Input,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Play: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Введите');
    await userEvent.type(input, 'Проверка Rovna UI');
    await expect(input).toHaveValue('Проверка Rovna UI');
    await userEvent.clear(input);
    await expect(input).toHaveValue('');
  },
  args: {
    'aria-label': 'Поле для проверки ввода',
    placeholder: 'Введите',
    allowClear: true,
  },
};

export const Disabled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Недоступно');
    await expect(input).toBeDisabled();
    await userEvent.type(input, 'Значение не должно появиться');
    await expect(input).toHaveValue('');
  },
  args: {
    disabled: true,
    placeholder: 'Недоступно',
  },
};

export const Validation: Story = {
  args: {
    placeholder: 'Некорректное значение',
    status: 'error',
  },
};

export const Default: Story = {
  args: {
    'aria-label': 'Текстовое поле',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Введите',
    allowClear: true,
    size: 'large',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Введите',
    allowClear: true,
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Введите',
    allowClear: true,
    size: 'small',
  },
};

export const Width1: Story = {
  args: {
    placeholder: 'Введите',
    width: '150px',
    suffix: <AccountBox />,
    prefix: <Home />,
  },
};

export const Width2: Story = {
  args: {
    placeholder: 'Введите',
    width: 150,
  },
};

export const Height1: Story = {
  args: {
    placeholder: 'Введите',
    height: '50px',
    suffix: <AccountBox />,
    prefix: <Home />,
  },
};

export const Height2: Story = {
  args: {
    placeholder: 'Введите',
    height: 50,
  },
};

export const Margin1: Story = {
  args: {
    placeholder: 'Введите',
    margin: '0 0 32px 0',
  },
};

export const Margin2: Story = {
  args: {
    placeholder: 'Введите',
    mt: '32px',
  },
};

export const Margin3: Story = {
  args: {
    placeholder: 'Введите',
    mr: 32,
  },
};

export const Margin4: Story = {
  args: {
    placeholder: 'Введите',
    mb: 32,
  },
};

export const Margin5: Story = {
  args: {
    placeholder: 'Введите',
    ml: 32,
  },
};

export const Customization: Story = {
  args: {
    size: 'medium',
    placeholder: 'Кастомный плейсхолдер',
    suffix: <AccountBox />,
    prefix: <Home />,
    allowClear: true,
  },
};
