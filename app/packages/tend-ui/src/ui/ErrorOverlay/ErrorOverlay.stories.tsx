import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ErrorOverlay } from './ErrorOverlay';

const meta: Meta<typeof ErrorOverlay> = {
  title: 'Rovna UI/Main/UI/ErrorOverlay',
  component: ErrorOverlay,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Constrained: Story = {
  render: () => (
    <div style={{ border: '1px solid #d9d9d9', maxWidth: 280 }}>
      <ErrorOverlay />
    </div>
  ),
};
