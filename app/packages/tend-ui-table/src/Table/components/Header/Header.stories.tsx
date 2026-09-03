import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from './Header';

const Component = () => {
  return <Header>Шапка таблицы</Header>;
};

const meta: Meta<typeof Component> = {
  title: 'Rovna UI/Table/Header',
  component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
