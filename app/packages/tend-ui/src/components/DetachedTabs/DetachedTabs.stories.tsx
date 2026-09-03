import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Drawer } from '@rovna-internal/components/primitives/Drawer';
import { Button } from '@rovna-internal/components/primitives/Button';

import { Buttons, Content, Root } from './components';

const meta: Meta<typeof Root> = {
  title: 'Rovna UI/Main/Components/DetachedTabs',
  component: Root,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Открыть
      </Button>
      <Root {...args}>
        <Drawer
          aria-label='Вкладки'
          open={open}
          above={<Buttons />}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Content />
        </Drawer>
      </Root>
    </>
  );
};

export const Example1: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Открыть' }));
    await expect(await page.findByText('Контент вкладки "Новые"')).toBeVisible();
    await userEvent.click(page.getByRole('tab', { name: 'Входящие' }));
    await expect(await page.findByText('Контент вкладки "Входящие"')).toBeVisible();
  },
  args: {
    size: 'small',
    items: [
      { key: 'key1', label: 'Новые', children: 'Контент вкладки "Новые"' },
      { key: 'key2', label: 'Входящие', children: 'Контент вкладки "Входящие"' },
      { key: 'key4', label: 'Сотрудник', children: 'Контент вкладки "Сотрудник"' },
      { key: 'key5', label: 'На проверке', children: 'Контент вкладки "На проверке"' },
      { key: 'key6', label: 'Черновик', children: 'Контент вкладки "Черновик"' },
    ],
  },
  render: Template,
};
