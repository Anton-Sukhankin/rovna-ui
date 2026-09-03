import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Popover } from './Popover';
import { Button } from '../Button';

const meta: Meta<typeof Popover> = {
  title: 'Rovna UI/Main/Primitives/Popover',
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xQt4wUntdZuq9Obx56Epbe/%F0%9F%94%B5Popover-%26-Tooltip?type=design&node-id=3-1837&mode=design&t=SF8IZLuW1yo4zrDX-4',
    },
  },
  args: {
    title: "Заголовок",
    content:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
    children: 'Наведи на меня',
  },
};

export const WithFooter1: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xQt4wUntdZuq9Obx56Epbe/%F0%9F%94%B5Popover-%26-Tooltip?type=design&node-id=3-1837&mode=design&t=SF8IZLuW1yo4zrDX-4',
    },
  },
  args: {
    title: "Заголовок",
    content:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
    children: 'Наведи на меня',
    footer: [
      <Button key='no' variant='link'>
        Отменить
      </Button>,
      <Button key='yes' variant='primary'>
        Принять
      </Button>,
    ],
  },
};

export const WithFooter2: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xQt4wUntdZuq9Obx56Epbe/%F0%9F%94%B5Popover-%26-Tooltip?type=design&node-id=3-1837&mode=design&t=SF8IZLuW1yo4zrDX-4',
    },
  },
  args: {
    title: "Заголовок",
    content:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
    children: 'Наведи на меня',
    footer: [
      <Button key='no' danger variant='link'>
        Отменить
      </Button>,
      <Button key='yes' variant='primary'>
        Принять
      </Button>,
    ],
  },
};

export const WithFooter3: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xQt4wUntdZuq9Obx56Epbe/%F0%9F%94%B5Popover-%26-Tooltip?type=design&node-id=3-1837&mode=design&t=SF8IZLuW1yo4zrDX-4',
    },
  },
  args: {
    title: "Заголовок",
    content:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
    children: 'Наведи на меня',
    footer: [
      <Button key='no' danger variant='link'>
        Отменить
      </Button>,
      <Button key='yes' variant='secondary'>
        Принять
      </Button>,
    ],
  },
};

export const KeyboardFocus: Story = {
  render: args => (
    <Popover {...args} trigger={['click']}>
      <Button>Открыть подсказку</Button>
    </Popover>
  ),
  args: {
    title: 'Заголовок',
    content: 'Содержимое подсказки',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Открыть подсказку' });

    trigger.focus();
    await userEvent.keyboard('{Enter}');
    await page.findByText('Содержимое подсказки');
    await waitFor(() =>
      expect(
        page
          .getAllByText('Содержимое подсказки')
          .some(element => element.getClientRects().length > 0),
      ).toBe(true),
    );
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};
