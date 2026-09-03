import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@rovna-ui/components/primitives';

import { Box } from './styled';

const meta: Meta<typeof Box> = {
  title: 'Rovna UI/Grid/Box',
  component: Box,
  argTypes: {
    $display: {
      control: 'text',
    },
    $alignItems: { control: 'text' },
    $flexDirection: { control: 'text' },
    $justifyContent: { control: 'text' },
    $position: { control: 'text' },
    $width: { control: 'text' },
    $height: { control: 'text' },
    $top: { control: 'text' },
    $right: { control: 'text' },
    $bottom: { control: 'text' },
    $left: { control: 'text' },
    $gap: { control: 'text' },
    $opacity: {
      control: 'text',
    },
    $pt: {
      control: 'text',
      description: "Верхний внутренний отступ",
    },
    $pr: {
      control: 'text',
      description: "Правый внутренний отступ",
    },
    $pb: {
      control: 'text',
      description: "Нижний внутренний отступ",
    },
    $pl: {
      control: 'text',
      description: "Левый внутренний отступ",
    },
    $mt: {
      control: 'text',
      description: "Верхний внешний отступ",
    },
    $mr: {
      control: 'text',
      description: "Правый внешний отступ",
    },
    $mb: {
      control: 'text',
      description: "Нижний внешний отступ",
    },
    $ml: {
      control: 'text',
      description: "Левый внешний отступ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Flex: Story = {
  args: {
    $display: 'flex',
  },
  render: args => {
    return (
      <Box {...args}>
        <Button>Первый</Button>
        <Button>Второй</Button>
        <Button>Третий</Button>
      </Box>
    );
  },
};

export const Padding: Story = {
  args: {
    $padding: '0 24px',
  },
  render: args => {
    return (
      <Box {...args}>
        <Button>Первый</Button>
        <Button>Второй</Button>
        <Button>Третий</Button>
      </Box>
    );
  },
};

export const Margin1: Story = {
  args: {
    $margin: '0 24px',
  },
  render: args => {
    return (
      <Box {...args}>
        <Button>Первый</Button>
        <Button>Второй</Button>
        <Button>Третий</Button>
      </Box>
    );
  },
};

export const Margin2: Story = {
  args: {
    $margin: 24,
  },
  render: args => {
    return (
      <Box {...args}>
        <Button>Первый</Button>
        <Button>Второй</Button>
        <Button>Третий</Button>
      </Box>
    );
  },
};

export const Gap: Story = {
  args: {
    $display: 'inline-flex',
    $gap: 24,
  },
  render: args => {
    return (
      <Box {...args}>
        <Button>Первый</Button>
        <Button>Второй</Button>
        <Button>Третий</Button>
      </Box>
    );
  },
};

export const Width: Story = {
  args: {
    $width: 100,
    $height: 5,
    $backgroundColor: 'red',
  },
};

export const Height: Story = {
  args: {
    $width: 5,
    $height: 100,
    $backgroundColor: 'red',
  },
};

export const MinWidth: Story = {
  args: {
    $minWidth: 1000,
    $height: 5,
    $backgroundColor: 'red',
  },
};

export const MinHeight: Story = {
  args: {
    $width: 5,
    $minHeight: 100,
    $backgroundColor: 'red',
  },
};

export const MaxWidth: Story = {
  args: {
    $maxWidth: 100,
    $width: 200,
    $height: 5,
    $backgroundColor: 'red',
  },
};

export const MaxHeight: Story = {
  args: {
    $height: 200,
    $width: 5,
    $maxHeight: 100,
    $backgroundColor: 'red',
  },
};

export const Appearance: Story = {
  args: {
    $color: 'white',
    $backgroundColor: '#686E78',
    $width: 100,
    $height: 100,
    children: "Тест",
  },
};

export const Grid: Story = {
  args: {
    $display: 'grid',
    $gridTemplateColumns: '1fr 1fr 1fr',
  },
  render: args => {
    return (
      <Box {...args}>
        <Button>Первый</Button>
        <Button>Второй</Button>
        <Button>Третий</Button>
      </Box>
    );
  },
};

export const Responsive: Story = {
  args: {
    $width: 50,
    $height: 50,
    $backgroundColor: {
      initial: 'black',
      xl: 'red',
      lg: 'blue',
      md: 'green',
      sm: 'yellow',
      xs: 'pink',
    },
  },
};
