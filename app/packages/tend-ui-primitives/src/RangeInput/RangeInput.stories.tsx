import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form, rangeInputValidator } from '@rovna-ui/components/components';
import { Button } from '@rovna-ui/components/primitives';
import { AccountBox, Home } from '@rovna-ui/icons';
import { argTypes } from '@rovna-ui/tools';

import { RangeInput } from './RangeInput';
import docs from './docs.json';

const meta: Meta<typeof RangeInput> = {
  title: 'Rovna UI/Primitives/RangeInput',
  component: RangeInput,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: ['От', 'До'],
    onChange: payload => {
      console.log('[Default][onChange]', payload);
    },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: ['От', 'До'],
    onChange: payload => {
      console.log('[Large][onChange]', payload);
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    placeholder: ['От', 'До'],
    onChange: payload => {
      console.log('[Small][onChange]', payload);
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onChange: payload => {
      console.log('[Disabled][onChange]', payload);
    },
  },
};

export const Before: Story = {
  args: {
    before: [<AccountBox key='account-box' />, <Home key='home' />],
    onChange: payload => {
      console.log('[Disabled][onChange]', payload);
    },
  },
};

export const After: Story = {
  args: {
    after: [<AccountBox key='account-box' />, <Home key='home' />],
    onChange: payload => {
      console.log('[Disabled][onChange]', payload);
    },
  },
};

export const WithForm: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dygznveZSTKYGJw7t7p7xb/%F0%9F%94%B5Checkbox%2C-%F0%9F%94%B5Radio%2C-%F0%9F%9F%A1Segmented-%26-%F0%9F%94%B5Toggle?type=design&node-id=92-1200&mode=design&t=jb4qSNcdcaQc9Oac-4',
    },
  },
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
          <RangeInput />
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
  parameters: {
    docs: {
      description: {
        story:
          'Для корректной валидации импортируйте кастомный валидатор `rangeInputValidator` из `@rovna-ui/components/components/Form` и переопределите `validator` в свойстве `rules`',
      },
    },
  },
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
              validator: rangeInputValidator,
            },
          ]}
        >
          <RangeInput placeholder={['Минимальная цена', 'Максимальная цена']} />
        </Form.Item>
        <Button type='submit'>Принять</Button>
        <Button type='button' onClick={() => form.resetFields()}>
          Сбросить
        </Button>
      </Form>
    );
  },
};
