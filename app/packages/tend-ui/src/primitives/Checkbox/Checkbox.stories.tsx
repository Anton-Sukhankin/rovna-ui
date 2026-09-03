import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Form } from '@rovna-internal/components/components';

import { Checkbox } from './Checkbox';
import { Button } from '../Button';

const meta: Meta<typeof Checkbox> = {
  title: 'Rovna UI/Main/Primitives/Checkbox',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  },
  args: {
    onChange: fn(),
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dygznveZSTKYGJw7t7p7xb/%F0%9F%94%B5Checkbox%2C-%F0%9F%94%B5Radio%2C-%F0%9F%9F%A1Segmented-%26-%F0%9F%94%B5Toggle?type=design&node-id=7-385&mode=design&t=jb4qSNcdcaQc9Oac-4',
    },
  },
};

export const Indeterminate: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dygznveZSTKYGJw7t7p7xb/%F0%9F%94%B5Checkbox%2C-%F0%9F%94%B5Radio%2C-%F0%9F%9F%A1Segmented-%26-%F0%9F%94%B5Toggle?type=design&node-id=7-395&mode=design&t=jb4qSNcdcaQc9Oac-4',
    },
  },
  args: {
    indeterminate: true,
  },
};

export const Disabled: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dygznveZSTKYGJw7t7p7xb/%F0%9F%94%B5Checkbox%2C-%F0%9F%94%B5Radio%2C-%F0%9F%9F%A1Segmented-%26-%F0%9F%94%B5Toggle?type=design&node-id=7-425&mode=design&t=jb4qSNcdcaQc9Oac-4',
    },
  },
  args: {
    disabled: true,
  },
};

export const IndeterminateDisabled: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dygznveZSTKYGJw7t7p7xb/%F0%9F%94%B5Checkbox%2C-%F0%9F%94%B5Radio%2C-%F0%9F%9F%A1Segmented-%26-%F0%9F%94%B5Toggle?type=design&node-id=7-429&mode=design&t=jb4qSNcdcaQc9Oac-4',
    },
  },
  args: {
    'aria-label': 'Частично выбранный недоступный флажок',
    disabled: true,
    indeterminate: true,
  },
};

export const DefaultWithLabel: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dygznveZSTKYGJw7t7p7xb/%F0%9F%94%B5Checkbox%2C-%F0%9F%94%B5Radio%2C-%F0%9F%9F%A1Segmented-%26-%F0%9F%94%B5Toggle?type=design&node-id=9-437&mode=design&t=jb4qSNcdcaQc9Oac-4',
    },
  },
  args: {
    children: "Флажок",
  },
};

export const IndeterminateWithLabel: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dygznveZSTKYGJw7t7p7xb/%F0%9F%94%B5Checkbox%2C-%F0%9F%94%B5Radio%2C-%F0%9F%9F%A1Segmented-%26-%F0%9F%94%B5Toggle?type=design&node-id=9-453&mode=design&t=jb4qSNcdcaQc9Oac-4',
    },
  },
  args: {
    children: "Флажок",
    indeterminate: true,
  },
};

export const DisabledWithLabel: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dygznveZSTKYGJw7t7p7xb/%F0%9F%94%B5Checkbox%2C-%F0%9F%94%B5Radio%2C-%F0%9F%9F%A1Segmented-%26-%F0%9F%94%B5Toggle?type=design&node-id=9-443&mode=design&t=jb4qSNcdcaQc9Oac-4',
    },
  },
  args: {
    children: "Флажок",
    disabled: true,
  },
};

export const IndeterminateDisabledWithLabel: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dygznveZSTKYGJw7t7p7xb/%F0%9F%94%B5Checkbox%2C-%F0%9F%94%B5Radio%2C-%F0%9F%9F%A1Segmented-%26-%F0%9F%94%B5Toggle?type=design&node-id=9-459&mode=design&t=jb4qSNcdcaQc9Oac-4',
    },
  },
  args: {
    children: "Флажок",
    disabled: true,
    indeterminate: true,
  },
};

export const LongLabel: Story = {
  args: {
    style: { width: '250px' },
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
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
    return (
      <Form>
        <Form.Item name='materials' label='Материалы' valuePropName='checked'>
          <Checkbox.Group>
            <Checkbox value='A'>Каменные материалы</Checkbox>
            <Checkbox value='B'>Растворы</Checkbox>
            <Checkbox value='C'>Металлы</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    );
  },
};

export const Vertical: Story = {
  render: args => {
    args;

    return (
      <Form>
        <Form.Item name='materials' label='Материалы' valuePropName='checked'>
          <Checkbox.Group layout='vertical'>
            <Checkbox value='A'>Каменные материалы</Checkbox>
            <Checkbox value='B'>Растворы</Checkbox>
            <Checkbox value='C'>Металлы</Checkbox>
          </Checkbox.Group>
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
          name='materials'
          label='Материалы'
          valuePropName='checked'
        >
          <Checkbox.Group layout='vertical'>
            <Checkbox value='A'>Каменные материалы</Checkbox>
            <Checkbox value='B'>Растворы</Checkbox>
            <Checkbox value='C'>Металлы</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <Button type='submit'>Далее</Button>
        </Form.Item>
      </Form>
    );
  },
};
