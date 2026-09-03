import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Home } from '@rovna-internal/components/icons/Home';

import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Rovna UI/Main/Components/Logo',
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'S.Home',
  },
};

export const Before: Story = {
  args: {
    before: <Home color='blue600' />,
    children: 'S.Home',
  },
};

export const After: Story = {
  args: {
    children: 'S.Home',
    after: <Home color='blue600' />,
  },
};

export const OnClick: Story = {
  args: {
    children: 'S.Home',
    before: <Home color='blue600' />,
    onClick: action('Logo clicked'),
  },
};
