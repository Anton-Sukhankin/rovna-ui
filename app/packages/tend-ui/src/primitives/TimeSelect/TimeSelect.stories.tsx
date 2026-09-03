import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Form } from '@rovna-internal/components/components';

import { TimeSelect } from './TimeSelect';

const meta: Meta<typeof TimeSelect> = {
  title: 'Rovna UI/Main/Primitives/TimeSelect',
  component: TimeSelect,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
  },
};

export const Customization: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Значение должно быть в виде HH:MM:SS',
      },
    },
  },
  args: {
    options: [
      { value: '9:20', label: '9:20' },
      { value: '13:10', label: '13:10' },
      { value: '15:40', label: '15:40' },
    ],
  },
};

export const WithForm: Story = {
  render: args => {
    return (
      <Form>
        <Form.Item label='Время встречи'>
          <TimeSelect {...args} aria-label='Время встречи' />
        </Form.Item>
      </Form>
    );
  },
};
