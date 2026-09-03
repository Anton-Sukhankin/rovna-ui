import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AccountBox, Home, House } from '@rovna-internal/components/icons';

import { Segmented } from './Segmented';

const visuallyHidden: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

const meta: Meta<typeof Segmented> = {
  title: 'Rovna UI/Main/Primitives/Segmented',
  component: Segmented,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ["Понедельник", "Вторник", "Среда"],
  },
};

export const Disabled: Story = {
  args: {
    options: [
      {
        label: "Понедельник",
        value: "Понедельник",
      },
      {
        label: "Вторник",
        value: "Вторник",
      },
      {
        label: "Среда",
        value: "Среда",
        disabled: true,
      },
    ],
  },
};

export const WithIcon: Story = {
  args: {
    options: [
      {
        icon: <Home />,
        label: "Понедельник",
        value: "Понедельник",
      },
      {
        icon: <Home />,
        label: "Вторник",
        value: "Вторник",
      },
      {
        icon: <Home />,
        label: "Среда",
        value: "Среда",
      },
    ],
  },
};

export const WithBadge1: Story = {
  args: {
    options: [
      {
        icon: <Home />,
        label: "Понедельник",
        value: "Понедельник",
        badge: { inner: 100 },
      },
      {
        icon: <Home />,
        label: "Вторник",
        value: "Вторник",
        badge: { inner: 24 },
      },
      {
        icon: <Home />,
        label: "Среда",
        value: "Среда",
        badge: { inner: 88 },
      },
    ],
  },
};

export const WithBadge2: Story = {
  args: {
    options: [
      {
        icon: <Home />,
        label: "Понедельник",
        value: "Понедельник",
        badge: { inner: 100, preset: 'blue' },
      },
      {
        icon: <Home />,
        label: "Вторник",
        value: "Вторник",
        badge: { inner: 24, preset: 'cyan' },
      },
      {
        icon: <Home />,
        label: "Среда",
        value: "Среда",
        badge: { inner: 88, preset: 'yellow' },
      },
    ],
  },
};

export const IconOnly: Story = {
  args: {
    options: [
      {
        icon: <Home />,
        label: <span style={visuallyHidden}>Понедельник</span>,
        value: "Понедельник",
      },
      {
        icon: <AccountBox />,
        label: <span style={visuallyHidden}>Вторник</span>,
        value: "Вторник",
      },
      {
        icon: <House />,
        label: <span style={visuallyHidden}>Среда</span>,
        value: "Среда",
      },
    ],
  },
};
