import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Rovna UI/Main/Primitives/Tabs',
  component: Tabs,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: 'Входящие' }));
    await expect(canvas.getByText('Контент вкладки "Входящие"')).toBeVisible();
  },
  args: {
    size: 'small',
    items: [
      { key: 'key1', label: 'Новые', children: <div>Контент вкладки "Новые"</div> },
      { key: 'key2', label: 'Входящие', children: 'Контент вкладки "Входящие"' },
      { key: 'key3', label: 'Подрядчик', children: 'Контент вкладки "Подрядчик"' },
      { key: 'key4', label: 'Сотрудник', children: 'Контент вкладки "Сотрудник"' },
      { key: 'key5', label: 'На проверке', children: 'Контент вкладки "На проверке"' },
      { key: 'key6', label: 'Черновик', children: 'Контент вкладки "Черновик"' },
    ],
  },
};

export const LongTabs: Story = {
  args: {
    size: 'large',
    items: new Array(30).fill('').map((_, i) => {
      const id = String(i + 1);

      return {
        label: `Вкладка ${id}`,
        key: id,
        disabled: i === 28,
        children: `Контент вкладки ${id}`,
      };
    }),
  },
};
