import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { useDebouncedCallback } from './useDebouncedCallback';

const onDebouncedValue = action('Debounced value changed');

const Component = ({ wait, placeholder }: { wait?: number; placeholder?: string }) => {
  const onChange = useDebouncedCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>(
    e => {
      onDebouncedValue(e.target.value);
    },
    { wait },
  );

  return <input placeholder={placeholder} onChange={onChange} />;
};

const meta: Meta<typeof Component> = {
  title: 'Rovna UI/Hooks/useDebouncedCallback',
  component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultCode = `
const Component = () => {
  const onChange = useDebouncedCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>(e => {
    console.info('Debounced value changed', e.target.value);
  });

  return <Input placeholder='Ввод текста с задержкой в 300 мс' onChange={onChange} />;
};
`;
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: DefaultCode,
      },
    },
  },
  args: {
    placeholder: 'Ввод текста с задержкой в 300 мс',
  },
};

const CustomizationCode = `
const Component = () => {
  const onChange = useDebouncedCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>(e => {
    console.info('Debounced value changed', e.target.value);
  }, { wait: 1000 });

  return <Input placeholder='Ввод текста с задержкой в 1000 мс' onChange={onChange} />;
};
`;
export const Customization: Story = {
  parameters: {
    docs: {
      source: {
        code: CustomizationCode,
      },
    },
  },
  args: {
    wait: 1000,
    placeholder: 'Ввод текста с задержкой в 1000 мс',
  },
};
