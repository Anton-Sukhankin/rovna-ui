import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Rovna UI/Main/Typography/Typography',
  component: Typography,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Базовый контейнер типографики',
  },
};

export const LongText: Story = {
  args: {
    children: 'Длинный русский текст проверяет перенос строк, доступную ширину и устойчивость устаревшего compatibility-компонента.',
  },
};

export const SemanticGroup: Story = {
  args: {
    'aria-label': 'Группа текстового содержимого',
    children: (
      <>
        <h3>Заголовок раздела</h3>
        <p>Описание раздела сохраняет семантику вложенных элементов.</p>
      </>
    ),
  },
};
