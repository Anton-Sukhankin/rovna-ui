import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccountBox } from '@rovna-ui/icons';
import { Text } from '@rovna-ui/typography';
import { argTypes } from '@rovna-ui/tools';

import { Dot } from './Dot';
import docs from './docs.json';

const meta: Meta<typeof Dot> = {
  title: 'Rovna UI/Primitives/Dot',
  component: Dot,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    inline: false,
    preset: 'default',
    children: <AccountBox />,
  },
};

export const Success: Story = {
  args: {
    inline: false,
    preset: 'success',
    children: <AccountBox />,
  },
};

export const Warning: Story = {
  args: {
    inline: false,
    preset: 'warning',
    children: <AccountBox />,
  },
};

export const Processing: Story = {
  args: {
    inline: false,
    preset: 'processing',
    children: <AccountBox />,
  },
};

export const Error: Story = {
  args: {
    inline: false,
    preset: 'error',
    children: <AccountBox />,
  },
};

export const Before: Story = {
  args: {
    before: <Text>Текст перед точкой</Text>,
  },
};

export const After: Story = {
  args: {
    after: <Text>Текст после точки</Text>,
  },
};

export const Icon: Story = {
  args: {
    inline: false,
    children: <AccountBox />,
    preset: 'yellow',
  },
};

export const Placement: Story = {
  args: {
    inline: false,
    children: <AccountBox />,
    placement: 'leftTop',
  },
};

export const Offset: Story = {
  args: {
    inline: false,
    preset: 'default',
    children: <AccountBox />,
    offset: [10, 0],
  },
};

export const Customization: Story = {
  args: {
    inline: false,
    children: <AccountBox />,
    color: 'gold400-transparent',
  },
};
