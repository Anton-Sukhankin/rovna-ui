import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { uniq } from 'lodash';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button } from '@rovna-internal/components/primitives';
import { Home } from '@rovna-internal/components/icons';
import { getRussianAnimal } from '@rovna-internal/components/stories/mockData';

import { BurgerMenu } from './BurgerMenu';
import { BurgerMenuItem } from '.';

const meta: Meta<typeof BurgerMenu> = {
  title: 'Rovna UI/Main/Components/BurgerMenu',
  component: BurgerMenu,
};

const isVisible = (element: HTMLElement) => {
  let current: HTMLElement | null = element;
  while (current) {
    const style = getComputedStyle(current);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }
    current = current.parentElement;
  }

  return element.getClientRects().length > 0;
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = uniq(
  Array.from({ length: 10 }).map<BurgerMenuItem>((_, index) => {
    return {
      key: `${index}`,
      label: getRussianAnimal(index),
      before: <Home />,
    };
  }),
);

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Открыть меню приложений' });
    await userEvent.click(trigger);
    let firstItem: HTMLElement | undefined;
    await waitFor(() => {
      firstItem = page
        .getAllByText(items[0].label as string)
        .find(element => isVisible(element));
      expect(firstItem).toBeDefined();
    }, { timeout: 5_000 });
    await userEvent.click(canvas.getByRole('button', { name: 'Закрыть меню приложений' }));
    await waitFor(() => expect(firstItem!).not.toBeVisible(), { timeout: 5_000 });
  },
  args: {
    items,
  },
};

export const Disabled: Story = {
  args: {
    items: [
      { key: '1', label: "Пункт 1" },
      { key: '2', label: "Пункт 2", disabled: true },
      { key: '3', label: "Пункт 3" },
      { key: '4', label: "Пункт 4" },
      { key: '5', label: "Пункт 5" },
    ],
  },
};

export const Tooltip: Story = {
  args: {
    items: [
      { key: '1', label: "Пункт 1", tooltip: { title: "Подсказка пункта 1" } },
      {
        key: '2',
        label: "Пункт 2",
        disabled: true,
        tooltip: { title: "Подсказка пункта 2" },
      },
      { key: '3', label: "Пункт 3" },
      { key: '4', label: "Пункт 4" },
      { key: '5', label: "Пункт 5" },
    ],
  },
};

export const Title: Story = {
  args: {
    title: 'Заголовок',
    items,
  },
};

export const Extra: Story = {
  args: {
    title: 'Заголовок',
    extra: <Button>Смотреть все</Button>,
    items,
  },
};

export const Footer: Story = {
  args: {
    footer: <Button variant='link'>Смотреть все</Button>,
    items,
  },
};

export const SelectedKeys: Story = {
  args: {
    title: 'Заголовок',
    items,
    selectedKeys: ['1'],
  },
};
