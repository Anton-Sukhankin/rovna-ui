import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Any } from '@rovna-ui/types';

import { UNSTABLE_useControllableStateV2 as useControllableState } from './useControllableState';
import { UseControllableStateParameters } from './types';

const Component = (parameters: UseControllableStateParameters<Any>) => {
  const [value, setValue] = useControllableState(parameters);

  return (
    <>
      <label htmlFor='controllable-state-value'>Управляемое значение</label>
      <input
        id='controllable-state-value'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        onClick={() => {
          console.log(value);
        }}
      >
        Тест
      </button>
    </>
  );
};

const meta: Meta<typeof Component> = {
  title: 'Rovna UI/Hooks/UNSTABLE_useControllableStateV2',
  component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "Пример текста",
  },
};
