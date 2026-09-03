import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { StackNavigation } from './StackNavigation';

const meta: Meta<typeof StackNavigation> = {
  title: 'Rovna UI/Primitives/StackNavigation',
  component: StackNavigation,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: action('Stack navigation selection changed'),
    items: [
      {
        key: '1',
        label: 'Меню 1',
        children: [
          { key: '4', label: 'Меню 4' },
          { key: '5', label: 'Меню 5' },
        ],
      },
      {
        key: '2',
        label: 'Меню 2',
        children: [
          { key: '6', label: 'Меню 6' },
          { key: '7', label: 'Меню 7' },
        ],
      },
      {
        key: '3',
        label: 'Меню 3',
        children: [
          { key: '8', label: 'Меню 8' },
          { key: '9', label: 'Меню 9' },
        ],
      },
    ],
  },
};
