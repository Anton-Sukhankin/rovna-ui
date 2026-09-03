import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { User } from '@rovna-internal/components/icons';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Rovna UI/Main/Primitives/Select',
  component: Select,
  args: {
    'aria-label': 'Выбор варианта',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = Array.from({ length: 30 }).map((_, index) => ({
  label: `Вариант ${index}`,
  value: `${index}`,
}));

export const Large: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(await page.findByTitle('Вариант 1'));
    await expect(await canvas.findByTitle('Вариант 1')).toBeVisible();
  },
  args: {
    placeholder: 'Выберите',
    allowClear: true,
    size: 'large',
    options,
    showSearch: true,
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Выберите',
    allowClear: true,
    size: 'medium',
    options,
    showSearch: true,
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Выберите',
    allowClear: true,
    size: 'small',
    options,
    showSearch: true,
  },
};

export const Multiple: Story = {
  args: {
    placeholder: 'Выберите',
    allowClear: true,
    mode: 'multiple',
    options,
    showSearch: true,
  },
};

export const OptionDescription: Story = {
  args: {
    placeholder: 'Выберите',
    options,
    optionDescription: option => `Это ${option.label}`,
  },
};

export const MultipleWithCustomTagAmount: Story = {
  args: {
    placeholder: 'Выберите',
    allowClear: true,
    mode: 'multiple',
    maxTagCount: 5,
    width: '500px',
    options,
    showSearch: true,
  },
};

export const MultipleWithResponsiveTagAmount: Story = {
  args: {
    placeholder: 'Выберите',
    allowClear: true,
    mode: 'multiple',
    maxTagCount: 'responsive',
    options,
    showSearch: true,
  },
};

export const Customization: Story = {
  args: {
    options,
    showSearch: true,
    width: '400px',
    size: 'medium',
    placeholder: 'Кастомный плейсхолдер',
    allowClear: true,
    mode: 'multiple',
    customSuffixIcon: <User size={16} />,
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Выберите',
    allowClear: true,
    size: 'medium',
    options,
    showSearch: true,
    fullWidth: true,
  },
};

export const LoadingWithEmptyOptions: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const combobox = canvas.getByRole('combobox');
    await expect(canvas.getByTestId('rovna-ui-spinner')).toBeVisible();
    await userEvent.click(combobox);
    await expect(page.queryByTitle('Вариант 1')).not.toBeInTheDocument();
    await expect(args.onChange).not.toHaveBeenCalled();
  },
  args: {
    placeholder: 'Выберите',
    allowClear: true,
    size: 'medium',
    options: [],
    loading: true,
    onChange: fn(),
  },
};

export const LoadingWithOptions: Story = {
  args: {
    placeholder: 'Выберите',
    allowClear: true,
    size: 'medium',
    options,
    showSearch: true,
    loading: true,
  },
};
