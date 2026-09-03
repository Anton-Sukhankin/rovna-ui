import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AccountBox, Home } from '@rovna-internal/components/icons';
import { RovnaUI } from '@rovna-internal/components/theme';

import { Password } from './Password';

const meta: Meta<typeof Password> = {
  title: 'Rovna UI/Main/Primitives/Password',
  component: Password,
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
    size: 'large',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Введите',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Введите',
    size: 'small',
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

export const Internationalization: Story = {
  args: {
    value: "Пример текста",
    size: 'medium',
    placeholder: "?Пример текста??",
    suffix: <AccountBox />,
    allowClear: true,
  },
  render: args => (
    <RovnaUI>
      <Password {...args} />
    </RovnaUI>
  ),
};
