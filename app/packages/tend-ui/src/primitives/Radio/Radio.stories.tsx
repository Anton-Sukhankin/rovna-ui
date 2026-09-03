import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Form } from '@rovna-internal/components/components';

import { Radio } from './Radio';
import { Button } from '../Button';

const meta: Meta<typeof Radio> = {
  title: 'Rovna UI/Main/Primitives/Radio',
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole('radio');
    await userEvent.click(radio);
    await expect(radio).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  },
  args: {
    'aria-label': 'Выбрать вариант',
    onChange: fn(),
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const DefaultWithLabel: Story = {
  args: {
    children: "Радиокнопка",
  },
};

export const DisabledWithLabel: Story = {
  args: {
    children: "Радиокнопка",
    disabled: true,
  },
};

export const LongLabel: Story = {
  args: {
    style: { width: '250px' },
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
  },
};

export const Group1: Story = {
  render: _args => <Radio.Group options={["Вариант 1", "Вариант 2", "Вариант 3"]} />,
};

export const Group2: Story = {
  render: _args => (
    <Radio.Group>
      <Radio value='A'>Вариант 1</Radio>
      <Radio value='B'>Вариант 2</Radio>
      <Radio value='C'>Вариант 3</Radio>
    </Radio.Group>
  ),
};

export const GroupButton1: Story = {
  render: _args => (
    <Radio.Group>
      <Radio.Button value='A'>Вариант 1</Radio.Button>
      <Radio.Button value='B'>Вариант 2</Radio.Button>
      <Radio.Button value='C'>Вариант 3</Radio.Button>
    </Radio.Group>
  ),
};
export const GroupButton2: Story = {
  render: _args => (
    <Radio.Group
      options={[
        {
          value: 'A',
          label: "Вариант 1",
        },
        {
          value: 'B',
          label: "Вариант 2",
        },
        {
          value: 'C',
          label: "Вариант 3",
        },
      ]}
      optionType='button'
    />
  ),
};

export const WithForm: Story = {
  render: _args => {
    return (
      <Form>
        <Form.Item name='radio-materials' label='Материалы' valuePropName='checked'>
          <Radio.Group>
            <Radio value='A'>Каменные материалы</Radio>
            <Radio value='B'>Растворы</Radio>
            <Radio value='C'>Металлы</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    );
  },
};

export const Vertical: Story = {
  render: _args => {
    return (
      <Form>
        <Form.Item name='radio-materials' label='Материалы' valuePropName='checked'>
          <Radio.Group layout='vertical'>
            <Radio value='A'>Каменные материалы</Radio>
            <Radio value='B'>Растворы</Radio>
            <Radio value='C'>Металлы</Radio>
          </Radio.Group>
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
          name='radio-materials'
          label='Материалы'
          valuePropName='checked'
        >
          <Radio.Group>
            <Radio value='A'>Каменные материалы</Radio>
            <Radio value='B'>Растворы</Radio>
            <Radio value='C'>Металлы</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type='submit'>Далее</Button>
        </Form.Item>
      </Form>
    );
  },
};
