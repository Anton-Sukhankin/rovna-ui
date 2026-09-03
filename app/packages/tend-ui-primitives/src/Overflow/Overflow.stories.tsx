import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { getRussianAnimal } from '@rovna-internal/components/stories/mockData';

import { Overflow } from './Overflow';

const meta: Meta<typeof Overflow> = {
  title: 'Rovna UI/Primitives/Overflow',
  component: Overflow,
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = Array.from({ length: 30 }).map((_, index) => {
  return getRussianAnimal(index);
});

export const Default: Story = {
  args: {
    items,
    render: item => <div style={{ marginRight: '8px' }}>{item}</div>,
    overflown: items => <div>и ещё {items.length} животных</div>,
  },
};
