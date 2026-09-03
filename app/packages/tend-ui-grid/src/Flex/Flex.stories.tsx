import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors } from '@rovna-ui/tokens/samolet';

import { Flex } from './Flex';
import { Box } from '../Box';

const meta: Meta<typeof Flex> = {
  title: 'Rovna UI/Grid/Flex',
  component: Flex,
};

export default meta;
type Story = StoryObj<typeof meta>;

const style = { padding: '16px', background: colors.blue50 };

export const Default: Story = {
  render: _args => {
    return (
      <Flex>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
      </Flex>
    );
  },
};

export const Horizontal: Story = {
  render: _args => {
    return (
      <Flex mb={100}>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
      </Flex>
    );
  },
};

export const Vertical: Story = {
  render: _args => {
    return (
      <Flex vertical>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
      </Flex>
    );
  },
};

export const Margin1: Story = {
  args: {
    margin: '0 0 32px 0',
  },
  render: args => {
    return (
      <Flex {...args}>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
      </Flex>
    );
  },
};

export const Margin2: Story = {
  args: {
    mt: '32px',
  },
  render: args => {
    return (
      <Flex {...args}>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
      </Flex>
    );
  },
};

export const Margin3: Story = {
  args: {
    mr: 32,
  },
  render: args => {
    return (
      <Flex {...args}>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
      </Flex>
    );
  },
};

export const Margin4: Story = {
  args: {
    mb: 32,
  },
  render: args => {
    return (
      <Flex {...args}>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
      </Flex>
    );
  },
};

export const Margin5: Story = {
  args: {
    ml: 32,
  },
  render: args => {
    return (
      <Flex {...args}>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
        <Box style={style}>Элемент</Box>
      </Flex>
    );
  },
};
