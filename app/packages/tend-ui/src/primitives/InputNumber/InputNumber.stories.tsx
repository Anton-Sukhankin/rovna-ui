import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { AccountBox, Home } from '@rovna-internal/components/icons';

import { InputNumber } from './InputNumber';
import { InputNumberProps } from './types';

const meta: Meta<typeof InputNumber> = {
  title: 'Rovna UI/Main/Primitives/InputNumber',
  component: InputNumber,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Числовое значение',
    fullWidth: true,
    onChange: fn(),
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    fullWidth: true,
    placeholder: 'Введите',
    onChange: fn(),
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    fullWidth: true,
    placeholder: 'Введите',
    onChange: fn(),
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    fullWidth: true,
    placeholder: 'Введите',
    onChange: fn(),
  },
};

export const Customization: Story = {
  args: {
    fullWidth: true,
    size: 'medium',
    placeholder: 'Кастомный плейсхолдер',
    suffix: <AccountBox />,
    prefix: <Home />,
    onChange: fn(),
  },
};

const StringModeTemplate = (args: InputNumberProps<string | number>) => {
  const [value, setValue] = React.useState<string | number>('');

  return (
    <InputNumber
      {...args}
      value={value}
      onChange={e => {
        if (!e) return;
        setValue(e);
      }}
    />
  );
};
export const StringMode: Story = {
  args: {
    'aria-label': 'Числовое значение в строковом формате',
    stringMode: true,
    fullWidth: true,
  },
  render: StringModeTemplate,
};
