import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Folder, Home } from '@rovna-ui/icons';

import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbsItem, BreadcrumbsProps } from './types';

const defaultItems: BreadcrumbsItem[] = [
  { key: 'home', label: 'Главная', href: '#home' },
  { key: 'projects', label: 'Проекты', href: '#projects' },
  { key: 'project', label: 'Карточка проекта' },
];

const longItems: BreadcrumbsItem[] = [
  { key: 'home', label: 'Главная', href: '#home' },
  { key: 'products', label: 'Продукты', href: '#products' },
  { key: 'analytics', label: 'Аналитика', href: '#analytics' },
  { key: 'reports', label: 'Отчеты', href: '#reports' },
  { key: 'quarter', label: 'Третий квартал', href: '#quarter' },
  { key: 'current', label: 'Сводный отчет' },
];

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Rovna UI/Primitives/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    items: {
      description: 'Уровни иерархии от корня до текущей страницы',
      control: 'object',
    },
    separator: {
      description: 'Разделитель между уровнями',
      control: false,
    },
    maxItems: {
      description: 'Максимальное число видимых уровней до сокращения цепочки',
      control: { type: 'number', min: 2, step: 1 },
    },
    maxItemWidth: {
      description: 'Максимальная ширина подписи одного уровня',
      control: 'text',
    },
    expanded: {
      description: 'Управляемое состояние раскрытия длинной цепочки',
      control: 'boolean',
    },
    defaultExpanded: {
      description: 'Начальное состояние раскрытия длинной цепочки',
      control: 'boolean',
    },
    expandLabel: {
      description: 'Доступное название кнопки раскрытия',
      control: 'text',
    },
  },
  args: {
    items: defaultItems,
    maxItemWidth: 240,
    onExpandedChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Три уровня',
};

export const SingleItem: Story = {
  name: 'Один уровень',
  args: {
    items: [{ key: 'current', label: 'Главная' }],
  },
};

export const TwoItems: Story = {
  name: 'Два уровня',
  args: {
    items: [defaultItems[0], defaultItems[2]],
  },
};

export const FiveItems: Story = {
  name: 'Пять уровней',
  args: {
    items: longItems.slice(0, 5),
  },
};

export const Collapsed: Story = {
  name: 'Длинная цепочка, свернута',
  args: {
    items: longItems,
    maxItems: 3,
  },
};

export const Expanded: Story = {
  name: 'Длинная цепочка, раскрыта',
  args: {
    items: longItems,
    maxItems: 3,
    defaultExpanded: true,
  },
};

export const ExpandInteraction: Story = {
  name: 'Раскрытие скрытых уровней',
  args: {
    items: longItems,
    maxItems: 3,
    onExpandedChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const expandButton = canvas.getByRole('button', {
      name: 'Показать скрытые уровни навигации: 3',
    });

    await userEvent.click(expandButton);

    await expect(canvas.getByText('Продукты')).toBeVisible();
    await expect(canvas.getByText('Аналитика')).toBeVisible();
    await expect(canvas.getByText('Отчеты')).toBeVisible();
    await expect(args.onExpandedChange).toHaveBeenCalledWith(true);
  },
};

export const WithIcons: Story = {
  name: 'С иконками',
  args: {
    items: [
      {
        key: 'home',
        label: 'Главная',
        href: '#home',
        icon: <Home size={16} />,
      },
      {
        key: 'catalog',
        label: 'Каталог',
        href: '#catalog',
        icon: <Folder size={16} />,
      },
      { key: 'current', label: 'Документы' },
    ],
  },
};

export const CustomSeparator: Story = {
  name: 'Другой разделитель',
  args: {
    items: defaultItems,
    separator: '/',
  },
};

export const ActionNavigation: Story = {
  name: 'Навигация через обработчик',
  args: {
    items: [
      { key: 'home', label: 'Главная', onClick: fn() },
      { key: 'catalog', label: 'Каталог', onClick: fn() },
      { key: 'current', label: 'Текущий раздел' },
    ],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Каталог' }));

    await expect(args.items[1].onClick).toHaveBeenCalledTimes(1);
  },
};

export const KeyboardFocus: Story = {
  name: 'Навигация с клавиатуры',
  args: {
    items: [
      { key: 'catalog', label: 'Каталог', onClick: fn() },
      { key: 'current', label: 'Текущий раздел' },
    ],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const navigationButton = canvas.getByRole('button', { name: 'Каталог' });

    await userEvent.tab();
    await expect(navigationButton).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.items[0].onClick).toHaveBeenCalledTimes(1);
  },
};

const ConstrainedTemplate = (args: BreadcrumbsProps) => (
  <div style={{ width: 480, maxWidth: '100%' }}>
    <Breadcrumbs {...args} />
  </div>
);

export const LongLabels: Story = {
  name: 'Длинные подписи',
  args: {
    items: [
      {
        key: 'home',
        label: 'Главная страница корпоративного портала',
        href: '#home',
      },
      {
        key: 'catalog',
        label: 'Каталог аналитических и операционных отчетов',
        href: '#catalog',
      },
      {
        key: 'current',
        label: 'Подробный сводный отчет по проектам за третий квартал',
      },
    ],
    maxItemWidth: 180,
  },
  render: ConstrainedTemplate,
};

const MobileTemplate = (args: BreadcrumbsProps) => (
  <div style={{ width: 288, maxWidth: '100%' }}>
    <Breadcrumbs {...args} />
  </div>
);

export const Mobile: Story = {
  name: 'Узкий экран',
  args: {
    items: longItems,
    maxItems: 2,
    maxItemWidth: 144,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: MobileTemplate,
};

export const CustomNavigationLabel: Story = {
  name: 'Уточненное название навигации',
  args: {
    'aria-label': 'Навигация по разделам проекта',
    items: defaultItems,
  },
};
