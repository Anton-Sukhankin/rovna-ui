import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from '@rovna-ui/components/components';
import { argTypes } from '@rovna-ui/tools';
import { expect, userEvent, within } from 'storybook/test';

import { Chips } from './Chips';
import { ChipsOption } from './types';
import docs from './docs.json';

const meta: Meta<typeof Chips> = {
  title: 'Rovna UI/Primitives/Chips',
  component: Chips,
  argTypes: argTypes(docs),
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
      onChange={v => {
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
    onChange={(v) => {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const monday = canvas.getByRole('checkbox', { name: 'Понедельник' });
    const mondayLabel = canvas.getByText('Понедельник');
    await userEvent.click(mondayLabel);
    await expect(monday).toBeChecked();
    await userEvent.click(mondayLabel);
    await expect(monday).not.toBeChecked();
  },
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
          mode='single'
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
      <Form.Item label='День недели' name='day'>
        <Chips
          options={weekDays}
        />
      </Form.Item>
    </Form>
  ),
};
