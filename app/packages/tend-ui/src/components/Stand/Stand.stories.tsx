import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stand } from './Stand';

const meta: Meta<typeof Stand> = {
  title: 'Rovna UI/Main/Components/Stand',
  component: Stand,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Dev: Story = {
  args: {
    stand: 'dev',
  },
};
export const Stage: Story = {
  args: {
    stand: 'stage',
  },
};
export const Prod: Story = {
  args: {
    stand: 'prod',
  },
};
