import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Form } from '@rovna-internal/components/components';

import { Chips } from './Chips';
import { ChipsOption } from './types';

const meta: Meta<typeof Chips> = {
  title: 'Rovna UI/Main/Primitives/Chips',
  component: Chips,
};

export default meta;
type Story = StoryObj<typeof meta>;

const weekDays = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

export const Default: Story = {
  args: {
    options: weekDays,
  },
};

const ControlledTemplate = (_args: unknown) => {
  const [value, setValue] = React.useState<ChipsOption[]>([]);

  return (
    <Chips
      value={value}
      onChange={(_, v) => {
        setValue(v);
      }}
      options={weekDays}
    />
  );
};
const ControlledCode = `
const [value, setValue] = React.useState<ChipsOption[]>([]);

return (
  <Chips
    value={value}
    onChange={(_, v) => {
      setValue(v);
    }}
    options={[
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ]}
  />
);
`;
export const Controlled: Story = {
  parameters: {
    docs: {
      source: {
        code: ControlledCode,
      },
    },
  },
  render: ControlledTemplate,
};

export const WithFormSingle: Story = {
  render: _args => (
    <Form>
      <Form.Item label='День недели' name='day'>
        <Chips
          options={weekDays}
        />
      </Form.Item>
    </Form>
  ),
};

const WithFormMultipleCode = `
<Form>
  <Form.Item
    label='День недели'
    name='day'
    getValueFromEvent={(_, options) => options}
  >
    <Chips
      options={[
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
      ]}
    />
  </Form.Item>
</Form>
`;
export const WithFormMultiple: Story = {
  parameters: {
    docs: {
      source: {
        code: WithFormMultipleCode,
      },
    },
  },
  render: _args => (
    <Form>
      <Form.Item
        label='День недели'
        name='day'
        getValueFromEvent={(_, options) => options}
      >
        <Chips
          options={weekDays}
        />
      </Form.Item>
    </Form>
  ),
};
