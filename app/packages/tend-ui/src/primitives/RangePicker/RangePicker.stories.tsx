import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Form } from '@rovna-internal/components/components/Form';
import { Button } from '@rovna-internal/components/primitives/Button';

import { RangePicker } from './RangePicker';

const meta: Meta<typeof RangePicker> = {
  title: 'Rovna UI/Main/Primitives/RangePicker',
  component: RangePicker,
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

export const Width: Story = {
  args: {
    allowClear: true,
    size: 'medium',
    width: '150px',
  },
};

export const FullWidth: Story = {
  args: {
    allowClear: true,
    size: 'medium',
    fullWidth: true,
  },
};

export const WithForm: Story = {
  render: _args => {
    return (
      <Form>
        <Form.Item name='meeting-date' label='Период встречи'>
          <RangePicker fullWidth />
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
          rules={[{ required: true, message: 'Поле обязательно' }]}
          name='meeting-date'
          label='Период встречи'
        >
          <RangePicker fullWidth />
        </Form.Item>
        <Form.Item>
          <Button type='submit'>Далее</Button>
        </Form.Item>
      </Form>
    );
  },
};
