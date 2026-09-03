import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Root } from '@rovna-internal/table/Table';

import { ControlPanel } from './ControlPanel';

const meta: Meta<typeof ControlPanel> = {
  title: 'Rovna UI/Table/ControlPanel',
  component: ControlPanel,
  decorators: [
    Story => (
      <Root>
        <Story />
      </Root>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Composition: Story = {
  args: {},
  render: _args => (
    <ControlPanel.Root>
      <ControlPanel.FiltersButton />
      <ControlPanel.MoreButton />
    </ControlPanel.Root>
  ),
};
