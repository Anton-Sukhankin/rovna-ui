import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { StepsHistoryApproval } from './StepsHistoryApproval';
import { StepsHistoryApprovalProps } from './types';
import { items } from './data';

const meta: Meta<typeof StepsHistoryApproval> = {
  title: 'Rovna UI/Main/Primitives/StepsHistoryApproval',
  component: StepsHistoryApproval,
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultTemplate = (args: StepsHistoryApprovalProps) => {
  return <StepsHistoryApproval {...args} />;
};

export const Default: Story = {
  args: {
    items,
    current: items.length - 1,
  },
  render: DefaultTemplate,
};
