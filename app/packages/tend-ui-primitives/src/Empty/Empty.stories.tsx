import type { Meta, StoryObj } from '@storybook/react-vite';
import { argTypes } from '@rovna-ui/tools';

import docs from './docs.json';
import { Empty } from './Empty';

const meta: Meta<typeof Empty> = {
  title: 'Rovna UI/Primitives/Empty',
  component: Empty,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};

export const EmptyLarge: Story = {
  args: {
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    size: 'large',
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};

export const EmptyMedium: Story = {
  args: {
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    size: 'medium',
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};
export const EmptySmall: Story = {
  args: {
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    size: 'small',
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};
export const EmptyXs: Story = {
  args: {
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    size: 'xs',
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};

export const NoResultsLarge: Story = {
  args: {
    size: 'large',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'no-results',
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};

export const NoResultsMedium: Story = {
  args: {
    size: 'medium',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'no-results',
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};

export const NoResultsSmall: Story = {
  args: {
    size: 'small',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'no-results',
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};
export const NoResultsXs: Story = {
  args: {
    size: 'xs',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'no-results',
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};

export const ErrorLarge: Story = {
  args: {
    size: 'large',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'error',
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};

export const ErrorMedium: Story = {
  args: {
    size: 'medium',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'error',
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};

export const ErrorSmall: Story = {
  args: {
    size: 'small',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'error',
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};
export const ErrorXs: Story = {
  args: {
    size: 'xs',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'error',
    title: 'Заявок нет',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};

export const SuccessLarge: Story = {
  args: {
    size: 'large',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'success',
    title: 'Заявок',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};
export const SuccessMedium: Story = {
  args: {
    size: 'medium',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'success',
    title: 'Заявок',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};
export const SuccessSmall: Story = {
  args: {
    size: 'small',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'success',
    title: 'Заявок',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};
export const SuccessXs: Story = {
  args: {
    size: 'xs',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'success',
    title: 'Заявок',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};

export const LoadingLarge: Story = {
  args: {
    size: 'large',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'loading',
    title: 'Заявок',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};
export const LoadingMedium: Story = {
  args: {
    size: 'medium',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'loading',
    title: 'Заявок',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};
export const LoadingSmall: Story = {
  args: {
    size: 'small',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'loading',
    title: 'Заявок',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};
export const LoadingXs: Story = {
  args: {
    size: 'xs',
    buttons: [{ children: 'Ясно', variant: 'secondary' }, { children: 'Понятно' }],
    variant: 'loading',
    title: 'Заявок',
    description:
      'Вы пока не подали ни одной заявки. Чтобы создать заявку, нажмите кнопку ниже',
  },
};
