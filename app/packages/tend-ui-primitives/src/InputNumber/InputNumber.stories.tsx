import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from '@rovna-ui/components/components';
import { AccountBox, Home } from '@rovna-ui/icons';
import { argTypes } from '@rovna-ui/tools';

import { Button } from '@rovna-ui/primitives';

import { UNSTABLE_InputNumber as InputNumber } from './InputNumber';
import docs from './docs.json';

const meta: Meta<typeof InputNumber> = {
  title: 'Rovna UI/Primitives/InputNumber',
  component: InputNumber,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Числовое значение',
    onChange: payload => {
      console.log('[Default][onChange]', payload);
    },
  },
};

export const Large: Story = {
  args: {
    'aria-label': 'Числовое значение большого размера',
    size: 'large',
    onChange: payload => {
      console.log('[Large][onChange]', payload);
    },
  },
};

export const Small: Story = {
  args: {
    'aria-label': 'Числовое значение малого размера',
    size: 'small',
    onChange: payload => {
      console.log('[Small][onChange]', payload);
    },
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Недоступное числовое значение',
    disabled: true,
    onChange: payload => {
      console.log('[Disabled][onChange]', payload);
    },
  },
};

export const Before: Story = {
  args: {
    'aria-label': 'Числовое значение с обозначением',
    before: <AccountBox />,
    onChange: payload => {
      console.log('[Disabled][onChange]', payload);
    },
  },
};

export const After: Story = {
  args: {
    'aria-label': 'Числовое значение с единицей измерения',
    after: <Home />,
    onChange: payload => {
      console.log('[Disabled][onChange]', payload);
    },
  },
};

export const WithForm: Story = {
  render: _args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form] = Form.useForm();

    return (
      <Form
        form={form}
        onValuesChange={changed => {
          console.log('[WithForm][onValuesChange]', changed);
        }}
      >
        <Form.Item name='price' label='Цена'>
          <InputNumber />
        </Form.Item>
        <Button type='submit'>Принять</Button>
        <Button type='button' onClick={() => form.resetFields()}>
          Сбросить
        </Button>
      </Form>
    );
  },
};

export const WithFormRequired: Story = {
  render: _args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form] = Form.useForm();

    return (
      <Form
        form={form}
        onValuesChange={v => {
          console.log('[WithFormRequired][onValuesChange]', v);
        }}
      >
        <Form.Item
          name='price'
          label='Цена'
          rules={[
            {
              required: true,
              message: 'Поле обязательно для заполнения',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Button type='submit'>Принять</Button>
        <Button type='button' onClick={() => form.resetFields()}>
          Сбросить
        </Button>
      </Form>
    );
  },
};
