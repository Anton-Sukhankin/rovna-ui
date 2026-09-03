import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from './Icon';
import * as IconsComponents from '.';

const meta: Meta<typeof Icon> = {
  title: 'Rovna UI/Icons/All',
  component: Icon,
  argTypes: {
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  args: {
    size: 24,
  },
  render: args => (
    <div>
      {Object.values(IconsComponents).map(C => (
        <C key={C.displayName} title={C.displayName} {...args} />
      ))}
    </div>
  ),
};
