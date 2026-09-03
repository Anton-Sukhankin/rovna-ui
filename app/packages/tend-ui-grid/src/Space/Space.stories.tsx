import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@rovna-ui/components/primitives';

import { Space } from './Space';

const meta: Meta<typeof Space> = {
  title: 'Rovna UI/Grid/Space',
  component: Space,
  argTypes: {
    fullWidth: {
      options: [true, false],
      control: { type: 'radio' },
    },
    direction: {
      options: ['vertical', 'horizontal'],
      control: { type: 'radio' },
    },
    grow: {
      options: ['first', 'last'],
      control: { type: 'radio' },
    },
    align: {
      options: ['baseline', 'center', 'start', 'end'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 16,
    children: (
      <>
        <Button>Первый</Button>
        <Button>Второй</Button>
        <Button>Третий</Button>
      </>
    ),
  },
};

export const Direction: Story = {
  args: {
    size: 16,
    direction: 'vertical',
    children: (
      <>
        <Button>Первый</Button>
        <Button>Второй</Button>
        <Button>Третий</Button>
      </>
    ),
  },
};

export const GrowFirst: Story = {
  args: {
    size: 16,
    grow: 'first',
    fullWidth: true,
    children: (
      <>
        <Button>Первый</Button>
        <Button>Второй</Button>
        <Button>Третий</Button>
      </>
    ),
  },
};

export const GrowLast: Story = {
  args: {
    size: 16,
    grow: 'last',
    fullWidth: true,
    children: (
      <>
        <Button>Первый</Button>
        <Button>Второй</Button>
        <Button>Третий</Button>
      </>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: (
      <>
        <Button>Первый</Button>
        <Button>Второй</Button>
        <Button>Третий</Button>
      </>
    ),
  },
};

// export const Compact: Story = {
//   render: args => {
//     return (
//       <Space direction='vertical'>
//         <Space.Compact>
//           <Button>First</Button>
//           <Button>Second</Button>
//           <Button>Third</Button>
//         </Space.Compact>
//         <Space.Compact>
//           <Button type='secondary' icon={<AccountBox />} />
//           <Button type='secondary' icon={<AlarmAdd />} />
//           <Button type='secondary' icon={<Bank />} />
//         </Space.Compact>
//       </Space>
//     );
//   },
// };
