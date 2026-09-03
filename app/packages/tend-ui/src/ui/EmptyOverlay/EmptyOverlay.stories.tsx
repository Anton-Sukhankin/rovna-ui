import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { EmptyOverlay } from './EmptyOverlay';

const meta: Meta<typeof EmptyOverlay> = {
  title: 'Rovna UI/Main/UI/EmptyOverlay',
  component: EmptyOverlay,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Constrained: Story = {
  render: () => (
    <div style={{ border: '1px solid #d9d9d9', maxWidth: 280 }}>
      <EmptyOverlay />
    </div>
  ),
};
