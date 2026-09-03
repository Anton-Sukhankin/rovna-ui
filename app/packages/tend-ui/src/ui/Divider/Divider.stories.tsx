import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@rovna-internal/components/primitives';
import { Box } from '@rovna-internal/components/grid';

import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Rovna UI/Main/UI/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Color: Story = {
  args: {
    color: 'blue600',
  },
};

export const Vertical: Story = {
  args: {
    variant: 'vertical',
  },
  render: args => (
    <Box $display='flex' $alignItems='center' $gap={16} style={{ padding: '24px 0' }}>
      <Button>Тест 1</Button>
      <Divider height='1.5em' {...args} />
      <Button>Тест 2</Button>
      <Divider height='1.5em' {...args} />
    </Box>
  ),
};
