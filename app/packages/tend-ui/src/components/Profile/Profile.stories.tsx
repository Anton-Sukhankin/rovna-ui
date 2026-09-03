import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box } from '@rovna-internal/components/grid';
import { getRussianPerson } from '@rovna-internal/components/stories/mockData';

import { Profile } from './Profile';

const meta: Meta<typeof Profile> = {
  title: 'Rovna UI/Main/Components/Profile',
  component: Profile,
};

export default meta;
type Story = StoryObj<typeof meta>;

const person = getRussianPerson(0);
const name = person.fullName;
const email = person.email;

export const Default: Story = {
  args: {
    title: name,
    description: email,
    avatar: {
      src: '/media/demo-avatar.svg',
    },
  },
};

export const Items: Story = {
  args: {
    title: name,
    description: email,
    avatar: {
      src: '/media/demo-avatar.svg',
    },
    items: [
      { key: 'contractor', label: 'Подрядчик' },
      { key: 'provider', label: 'Поставщик' },
    ],
  },
};

export const Initials: Story = {
  args: {
    title: name,
    description: email,
    avatar: {
      children: name
        .split(' ')
        .map(n => n[0])
        .join(''),
    },
  },
};

export const Status: Story = {
  args: {
    title: name,
    description: email,
    avatar: {
      status: 'online',
      src: '/media/demo-avatar.svg',
    },
  },
  render: _args => (
    <Box $display='flex' $alignItems='center' $gap={8}>
      <Profile
        title={name}
        description={email}
        avatar={{
          status: 'online',
          src: '/media/demo-avatar.svg',
        }}
      />
      <Profile
        title={name}
        description={email}
        avatar={{
          status: 'offline',
          src: '/media/demo-avatar.svg',
        }}
      />
      <Profile
        title={name}
        description={email}
        avatar={{
          status: 'busy',
          src: '/media/demo-avatar.svg',
        }}
      />
      <Profile
        title={name}
        description={email}
        avatar={{
          status: 'away',
          src: '/media/demo-avatar.svg',
        }}
      />
    </Box>
  ),
};
