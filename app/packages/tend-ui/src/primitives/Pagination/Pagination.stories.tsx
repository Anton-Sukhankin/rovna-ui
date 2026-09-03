import React from 'react';
import type { Meta } from '@storybook/react-vite';

import { Pagination } from './Pagination';
import { PaginationProps } from './types';

const meta: Meta<typeof Pagination> = {
  title: 'Rovna UI/Main/Primitives/Pagination',
  component: Pagination,
  argTypes: {
    size: {
      control: { type: 'radio' },
      description: 'Размер пагинации',
      options: ['medium', 'small'],
    },
    total: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Общее количество элементов',
      table: {
        type: { summary: 'number' },
      },
    },
    showTotal: {
      control: { type: 'boolean' },
      description: 'Функция для отображения "Всего N"',
      defaultValue: true,
      table: {
        type: { summary: '(total, range) => ReactNode' },
      },
    },
    showLessItems: {
      control: { type: 'boolean' },
      description: 'Показывать меньше элементов',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    showQuickJumper: {
      control: { type: 'boolean' },
      description: 'Показывать быстрый переход',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showSizeChanger: {
      control: { type: 'boolean' },
      description: 'Показывать размер страницы',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    defaultCurrent: { table: { disable: true } },
    prevIconTooltip: { table: { disable: true } },
    nextIconTooltip: { table: { disable: true } },
    locale: { table: { disable: true } },
  },
  args: {
    size: 'medium',
    total: 100,
    showTotal: undefined,
    showLessItems: true,
    showQuickJumper: false,
    showSizeChanger: false,
  },
};

export default meta;

export const Default = (args: PaginationProps) => (
  <Pagination
    {...args}
    showTotal={args.showTotal ? (total, _range) => `Всего ${total}` : undefined}
  />
);
