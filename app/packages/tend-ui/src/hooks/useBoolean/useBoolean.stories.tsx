import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@rovna-internal/components/primitives';
import { Box } from '@rovna-internal/components/grid';

import { useBoolean } from './useBoolean';

const Component = () => {
  const [value, setValue] = useBoolean();

  return (
    <Box $display='flex' $alignItems='center' $gap={8}>
      {value ? 'Да' : 'Нет'}
      <Button
        onClick={() => {
          setValue(true);
        }}
      >
        Установить «Да»
      </Button>
      <Button
        onClick={() => {
          setValue(false);
        }}
      >
        Установить «Нет»
      </Button>
      <Button
        onClick={() => {
          setValue();
        }}
      >
        Переключить
      </Button>
    </Box>
  );
};

const meta: Meta<typeof Component> = {
  title: 'Rovna UI/Main/Hooks/useBoolean',
  component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

const code = `
const [value, setValue] = useBoolean();

return (
  <Box $display='flex' $alignItems='center' $gap={8}>
    {value ? 'Да' : 'Нет'}
    <Button
      onClick={() => {
        setValue(true);
      }}
    >
      Установить «Да»
    </Button>
    <Button
      onClick={() => {
        setValue(false);
      }}
    >
      Установить «Нет»
    </Button>
    <Button
      onClick={() => {
        setValue();
      }}
    >
      Переключить
    </Button>
  </Box>
);
`;

export const Default: Story = {
  render: Component,
  parameters: {
    docs: {
      source: {
        code,
      },
    },
  },
};
