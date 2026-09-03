import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AccountBox } from '@rovna-internal/components/icons';
import { RovnaUI } from '@rovna-internal/components/theme/RovnaUI';

import { Search } from './Search';

const meta: Meta<typeof Search> = {
  title: 'Rovna UI/Main/Components/Search',
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
    placeholder: 'Введите запрос',
    allowClear: true,
    size: 'large',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Введите запрос',
    allowClear: true,
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Введите запрос',
    allowClear: true,
    size: 'small',
  },
};

export const Customization: Story = {
  args: {
    size: 'medium',
    placeholder: 'Кастомный плейсхолдер',
    suffix: <AccountBox />,
    allowClear: true,
    clearIconTooltip: { title: "Тест" },
  },
};

export const Internationalization: Story = {
  args: {
    value: "Пример текста",
    size: 'medium',
    placeholder: "?Пример текста??",
    suffix: <AccountBox />,
    allowClear: true,
  },
  render: args => (
    <RovnaUI lang='en'>
      <Search {...args} />
    </RovnaUI>
  ),
};
