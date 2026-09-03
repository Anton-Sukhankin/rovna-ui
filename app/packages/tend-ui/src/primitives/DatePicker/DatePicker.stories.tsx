import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Form } from '@rovna-internal/components/components/Form';
import { Button } from '@rovna-internal/components/primitives/Button';

import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Rovna UI/Main/Primitives/DatePicker',
  component: DatePicker,
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
    placeholder: 'Введите',
    allowClear: true,
    size: 'medium',
  },
};

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

export const Width: Story = {
  args: {
    allowClear: true,
    size: 'medium',
    width: '150px',
  },
};

export const Margin1: Story = {
  args: {
    placeholder: 'Введите',
    margin: '0 0 32px 0',
  },
};

export const Margin2: Story = {
  args: {
    placeholder: 'Введите',
    mt: '32px',
  },
};

export const Margin3: Story = {
  args: {
    placeholder: 'Введите',
    mr: 32,
  },
};

export const Margin4: Story = {
  args: {
    placeholder: 'Введите',
    mb: 32,
  },
};

export const Margin5: Story = {
  args: {
    placeholder: 'Введите',
    ml: 32,
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
        <Form.Item name='meeting-date' label='Дата встречи'>
          <DatePicker fullWidth />
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
          label='Дата встречи'
        >
          <DatePicker fullWidth />
        </Form.Item>
        <Form.Item>
          <Button type='submit'>Далее</Button>
        </Form.Item>
      </Form>
    );
  },
};

const CustomizationCode = `
<DatePicker
  bordered={false}
  suffixIcon={null}
  placeholder='Выберите дату'
  inputRender={() => <DatePicker.Trigger />}
/>
`;
export const Customization: Story = {
  parameters: {
    docs: {
      source: {
        code: CustomizationCode,
      },
    },
  },
  render: _args => {
    return (
      <DatePicker
        bordered={false}
        suffixIcon={null}
        placeholder='Выберите дату'
        inputRender={() => <DatePicker.Trigger />}
      />
    );
  },
};
