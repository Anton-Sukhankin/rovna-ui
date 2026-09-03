import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Form } from '@rovna-internal/components/components';
import { Button } from '@rovna-internal/components/primitives';

import { TimePicker } from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Rovna UI/Main/Primitives/TimePicker',
  component: TimePicker,
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

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const WithForm: Story = {
  render: _args => {
    return (
      <Form>
        <Form.Item name='meeting-time' label='Время встречи'>
          <TimePicker fullWidth />
        </Form.Item>
      </Form>
    );
  },
};

export const Required: Story = {
  render: _args => {
    return (
      <Form>
        <Form.Item
          rules={[{ required: true, message: 'Выберите время встречи' }]}
          name='meeting-time'
          label='Время встречи'
        >
          <TimePicker fullWidth />
        </Form.Item>
        <Form.Item>
          <Button type='submit'>Далее</Button>
        </Form.Item>
      </Form>
    );
  },
};
