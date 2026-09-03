import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { argTypes } from '@rovna-ui/tools';

import { Root } from './Root';
import docs from './docs.json';

const meta: Meta<typeof Root> = {
  title: 'Rovna UI/Table/Root',
  component: Root,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Контекст таблицы готов</div>,
  },
};
