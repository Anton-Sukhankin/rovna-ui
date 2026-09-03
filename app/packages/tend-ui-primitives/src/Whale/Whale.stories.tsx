import type { Meta, StoryObj } from '@storybook/react-vite';

import { Whale } from './Whale';

const meta: Meta<typeof Whale> = {
  title: 'Rovna UI/Primitives/Whale',
  component: Whale,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    type: 'empty',
  },
};

export const Fail: Story = {
  args: {
    type: 'fail',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
  },
};

export const Process: Story = {
  args: {
    type: 'process',
  },
};
