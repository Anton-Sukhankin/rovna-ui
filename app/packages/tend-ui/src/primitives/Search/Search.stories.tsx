import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AccountBox } from '@rovna-internal/components/icons';

import { Search } from './Search';

const meta: Meta<typeof Search> = {
  title: 'Rovna UI/Main/Primitives/Search',
  component: Search,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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
  },
};

export const Width2: Story = {
  args: {
    placeholder: 'Введите',
    width: 150,
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
    allowClear: true,
    clearIconTooltip: { title: "Тест" },
    enterButton: 'Найти',
  },
};
