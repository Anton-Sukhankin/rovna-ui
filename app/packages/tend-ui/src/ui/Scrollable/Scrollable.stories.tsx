import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Scrollable } from './Scrollable';

const meta: Meta<typeof Scrollable> = {
  title: 'Rovna UI/Main/UI/Scrollable',
  component: Scrollable,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        {Array.from({ length: 20 }).map((_, idx) => (
          <div key={idx}>Элемент {idx}</div>
        ))}
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    children: (
      <div style={{ whiteSpace: 'nowrap' }}>
        {Array.from({ length: 25 }).map((_, idx) => `Item ${idx}`)}
      </div>
    ),
  },
};
