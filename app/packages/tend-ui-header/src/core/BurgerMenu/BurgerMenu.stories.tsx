import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home } from '@rovna-ui/icons';
import { colors } from '@rovna-ui/tokens/samolet';
import { action } from 'storybook/actions';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { BurgerMenu } from './BurgerMenu';

const meta: Meta<typeof BurgerMenu> = {
  title: 'Rovna UI/Header/core/BurgerMenu',
  component: BurgerMenu,
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
  type: 'group' as const,
  key: `group_${groupIndex}`,
  label: `Группа ${groupIndex}`,
  children: Array.from({ length: 4 }).map((_, itemIndex) => ({
    key: `group_${groupIndex}_item_${itemIndex}`,
    label: `Проект ${itemIndex}`,
    icon: <Home />,
  })),
}));

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Открыть меню приложений' });
    await userEvent.click(trigger);
    const projects = await page.findAllByRole('button', { name: 'Проект 0' });
    await userEvent.click(projects[0]);
    await waitFor(() => expect(args.onSelect).toHaveBeenCalled());
    await userEvent.click(trigger);
    await waitFor(() => expect(args.onOpenChange).toHaveBeenLastCalledWith(false), {
      timeout: 5_000,
    });
    await waitFor(() => expect(projects[0]).not.toBeVisible(), { timeout: 5_000 });
  },
  args: {
    items,
    onOpenChange: fn(),
    onSelect: fn(),
  },
};

export const LoadingSamolet: Story = {
  args: {
    loading: true,
    items,
    preloaderVariant: 'samolet',
  },
};

export const LoadingGlobal: Story = {
  args: {
    loading: true,
    items,
    preloaderVariant: 'global',
  },
};

export const Error: Story = {
  args: {
    error: true,
    items,
    onSelect: action('Burger menu selection changed'),
  },
};
