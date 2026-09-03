import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home } from '@rovna-ui/icons';
import { colors } from '@rovna-ui/tokens/samolet';
import { action } from 'storybook/actions';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DrawerBurgerMenu } from './DrawerBurgerMenu';

const meta: Meta<typeof DrawerBurgerMenu> = {
  title: 'Rovna UI/Header/core/DrawerBurgerMenu',
  component: DrawerBurgerMenu,
  decorators: [
    Story => (
      <div style={{ background: colors.blue600, display: 'inline-block' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = Array.from({ length: 6 }).map((_, groupIndex) => ({
  key: `group_${groupIndex}`,
  label: `Группа ${groupIndex}`,
  children: Array.from({ length: 4 }).map((_, itemIndex) => ({
    key: `group_${groupIndex}_item_${itemIndex}`,
    label: `Проект ${itemIndex}`,
    icon: <Home />,
  })),
}));

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Открыть меню' }));
    const dialog = await page.findByRole('dialog', { name: 'Меню' });
    await expect(dialog).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Закрыть меню' }));
    await waitFor(
      () =>
        expect(canvas.getByRole('button', { name: 'Открыть меню' })).toHaveAttribute(
          'aria-expanded',
          'false',
        ),
      { timeout: 2000 },
    );
    await waitFor(
      () => expect(page.queryByRole('dialog', { name: 'Меню' })).not.toBeInTheDocument(),
      { timeout: 2000 },
    );
  },
  args: {
    title: 'Меню',
    onClose: fn(),
    onOpenChange: fn(),
    navigation: {
      items,
      onSelect: action('Drawer burger menu selection changed'),
    },
  },
};

export const Header: Story = {
  args: {
    header: <div>Заголовок</div>,
    title: 'Меню',
    navigation: {
      items,
      onSelect: action('Drawer burger menu selection changed'),
    },
  },
};

export const Footer: Story = {
  args: {
    footer: <div>Заголовок</div>,
    title: 'Меню',
    navigation: {
      items,
      onSelect: action('Drawer burger menu selection changed'),
    },
  },
};
