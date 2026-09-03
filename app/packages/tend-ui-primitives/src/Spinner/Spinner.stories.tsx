import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors } from '@rovna-ui/tokens/samolet';
import { argTypes } from '@rovna-ui/tools';

import { Spinner } from './Spinner';
import docs from './docs.json';

const meta: Meta<typeof Spinner> = {
  title: 'Rovna UI/Primitives/Spinner',
  component: Spinner,
  decorators: [
    Story => (
      <div style={{ color: colors.blue600 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const LargeWhite: Story = {
  decorators: [
    Story => (
      <span style={{ display: 'inline-block', backgroundColor: colors.gray500 }}>
        <Story />
      </span>
    ),
  ],
  args: {
    size: 'large',
    color: 'white',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const MediumWhite: Story = {
  decorators: [
    Story => (
      <span style={{ display: 'inline-block', backgroundColor: colors.gray500 }}>
        <Story />
      </span>
    ),
  ],
  args: {
    size: 'medium',
    color: 'white',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const SmallWhite: Story = {
  decorators: [
    Story => (
      <span style={{ display: 'inline-block', backgroundColor: colors.gray500 }}>
        <Story />
      </span>
    ),
  ],
  args: {
    size: 'small',
    color: 'white',
  },
};

export const Xs: Story = {
  args: {
    size: 'xs',
  },
};

export const XsWhite: Story = {
  decorators: [
    Story => (
      <span style={{ display: 'inline-block', backgroundColor: colors.gray500 }}>
        <Story />
      </span>
    ),
  ],
  args: {
    size: 'xs',
    color: 'white',
  },
};

export const Color: Story = {
  args: {
    color: 'red800',
  },
};
