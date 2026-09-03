import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccountBox } from '@rovna-ui/icons';
import { Text } from '@rovna-ui/typography';
import { argTypes } from '@rovna-ui/tools';

import { Counter } from './Counter';
import docs from './docs.json';

const meta: Meta<typeof Counter> = {
  title: 'Rovna UI/Primitives/Counter',
  component: Counter,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    inline: false,
    preset: 'default',
    inner: 10,
    children: <AccountBox />,
  },
};

export const Success: Story = {
  args: {
    inline: false,
    preset: 'success',
    inner: 10,
    children: <AccountBox />,
  },
};

export const Warning: Story = {
  args: {
    inline: false,
    preset: 'warning',
    inner: 10,
    children: <AccountBox />,
  },
};

export const Processing: Story = {
  args: {
    inline: false,
    preset: 'processing',
    inner: 10,
    children: <AccountBox />,
  },
};

export const Error: Story = {
  args: {
    inline: false,
    preset: 'error',
    inner: 10,
    children: <AccountBox />,
  },
};

export const Before: Story = {
  args: {
    inner: 110,
    before: <Text>Текст перед счетчиком</Text>,
  },
};

export const After: Story = {
  args: {
    inner: 110,
    after: <Text>Текст после счетчика</Text>,
  },
};

export const Icon: Story = {
  args: {
    inline: false,
    children: <AccountBox />,
    inner: <AccountBox />,
    preset: 'yellow',
  },
};

export const Placement: Story = {
  args: {
    inline: false,
    inner: 10,
    children: <AccountBox />,
    placement: 'leftTop',
  },
};

export const Offset: Story = {
  args: {
    inline: false,
    preset: 'default',
    inner: 10,
    children: <AccountBox />,
    offset: [10, 0],
  },
};

export const ShowZero: Story = {
  args: {
    inline: false,
    showZero: true,
    inner: 0,
    children: <AccountBox />,
  },
};

export const Customization: Story = {
  args: {
    inline: false,
    inner: 10,
    children: <AccountBox />,
    color: 'gray0',
    backgroundColor: 'blue600',
  },
};
