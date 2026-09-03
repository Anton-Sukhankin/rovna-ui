import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { HotFilters } from './HotFilters';

const meta: Meta<typeof HotFilters> = {
  title: 'Rovna UI/Filters/HotFilters',
  component: HotFilters,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Номер' });
    await userEvent.type(input, '123');
    await expect(input).toHaveValue('123');
    await waitFor(() => expect(args.onFilterValuesChange).toHaveBeenCalled());
  },
  args: {
    onFilterValuesChange: fn(),
    filters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input', allowClear: true },
      },
      {
        id: 'price',
        name: 'price',
        label: 'Цена',
        component: { component: 'input-number' },
        requires: ['number'],
      },
      {
        id: 'range-price',
        name: 'range-price',
        label: 'Диапазон',
        component: { component: 'range-input', placeholder: ['От', 'До'] },
      },
    ],
  },
};
