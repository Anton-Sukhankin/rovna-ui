import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { NumberFormatter, NumberFormatterOptions } from './NumberFormatter';

const Component = (options: NumberFormatterOptions) => {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <label htmlFor='number-formatter-value'>Число для форматирования</label>
      <input
        id='number-formatter-value'
        type='text'
        onChange={e => setValue(e.target.value)}
      />
      <div>{NumberFormatter.format(parseFloat(value), options)}</div>
    </div>
  );
};

const meta: Meta<typeof Component> = {
  title: 'Rovna UI/Hooks/NumberFormatter',
  component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Currency: Story = {
  args: {
    currency: true,
  },
};
export const MinimumFractionDigits: Story = {
  args: {
    minimumFractionDigits: 3,
  },
};
export const MaximumFractionDigits: Story = {
  args: {
    maximumFractionDigits: 5,
  },
};
