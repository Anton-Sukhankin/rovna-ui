import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ActionsButton } from './ActionsButton';

const meta: Meta<typeof ActionsButton> = {
  title: 'Rovna UI/Main/Components/ActionsButton',
  component: ActionsButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { key: '1', label: 'Материал' },
      { key: '2', label: 'Вид работ' },
      { key: '3', label: 'Создание проекта' },
    ],
  },
};

export const Cascade: Story = {
  args: {
    trigger: ['hover'],
    items: [
      {
        key: '1',
        label: 'Материал',
      },
      {
        key: '2',
        label: 'Вид работ',
        children: [
          { key: '3', label: 'Черновые' },
          { key: '4', label: 'Чистовые' },
        ],
      },
      { key: '5', label: 'Создание проекта' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    items: [
      { key: '1', label: 'Материал' },
      { key: '2', label: 'Вид работ' },
      { key: '3', label: 'Создание проекта' },
    ],
  },
};

export const Trigger: Story = {
  args: {
    trigger: ['hover'],
    items: [
      { key: '1', label: 'Материал' },
      { key: '2', label: 'Вид работ' },
      { key: '3', label: 'Создание проекта' },
    ],
  },
};

export const Custom: Story = {
  args: {
    items: [
      { key: '1', label: 'Материал' },
      { key: '2', label: 'Вид работ' },
      { key: '3', label: 'Создание проекта' },
    ],
  },
  render: args => (
    <ActionsButton.Root {...args}>
      <ActionsButton.Trigger preset='danger' variant='primary'>
        Просто какие-то действия
      </ActionsButton.Trigger>
    </ActionsButton.Root>
  ),
};
