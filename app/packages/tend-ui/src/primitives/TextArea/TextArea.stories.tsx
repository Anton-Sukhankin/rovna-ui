import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Form } from '@rovna-internal/components/components';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Rovna UI/Main/Primitives/TextArea',
  component: TextArea,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    placeholder: 'Введите',
    allowClear: true,
    size: 'large',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Введите',
    allowClear: true,
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Введите',
    allowClear: true,
    size: 'small',
  },
};

export const AutoSize1: Story = {
  args: {
    placeholder: 'Введите',
    size: 'medium',
    allowClear: true,
    autoSize: true,
  },
};

export const AutoSize2: Story = {
  args: {
    placeholder: 'Введите',
    size: 'medium',
    allowClear: true,
    autoSize: { minRows: 1, maxRows: 8 },
  },
};

export const WithForm: Story = {
  render: _args => {
    return (
      <Form
        onValuesChange={(changed, values) => {
          console.log('Changed:', changed);
          console.log('Values:', values);
        }}
      >
        <Form.Item name='comment' label='Комментарий'>
          <TextArea />
        </Form.Item>
      </Form>
    );
  },
};

export const Customization: Story = {
  args: {
    size: 'medium',
    placeholder: 'Кастомный плейсхолдер',
    allowClear: true,
  },
};
