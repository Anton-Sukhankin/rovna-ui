import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Rovna UI/Main/Primitives/Progress',
  component: Progress,
  args: {
    'aria-label': 'Прогресс выполнения',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percent: 30,
  },
};

export const Active: Story = {
  args: {
    percent: 50,
    status: 'active',
  },
};

export const Exception: Story = {
  args: {
    percent: 79,
    status: 'exception',
  },
};

export const Done: Story = {
  args: {
    percent: 100,
  },
};

export const ShowInfo: Story = {
  args: {
    percent: 50,
    showInfo: false,
  },
};
