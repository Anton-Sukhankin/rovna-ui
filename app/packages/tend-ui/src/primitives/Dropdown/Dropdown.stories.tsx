import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Rovna UI/Main/Primitives/Dropdown',
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { key: '1', label: "Вариант 1" },
      { key: '2', label: "Вариант 2" },
      { key: '3', label: "Вариант 3" },
      { key: '4', label: "Вариант 4" },
      { key: '5', label: "Вариант 5" },
    ],
    children: 'Наведи на меня',
  },
};

export const Group: Story = {
  args: {
    items: [
      {
        type: 'group',
        key: '1',
        label: 'Материалы',
        children: [
          { key: '2', label: 'Дерево' },
          { key: '3', label: 'Песок' },
          { key: '4', label: 'Метал' },
        ],
      },
      { type: 'divider' },
      {
        type: 'group',
        key: '5',
        label: 'Вид работы',
        children: [
          { key: '6', label: 'Чистовые' },
          { key: '7', label: 'Черновые' },
        ],
      },
    ],
    children: 'Наведи на меня',
  },
};

export const Cascade: Story = {
  args: {
    items: [
      {
        type: 'group',
        key: '1',
        label: "Группа 1",
        children: [
          {
            key: '2',
            label: "Вариант 1",
            children: [
              {
                type: 'group',
                key: '3',
                label: "Группа 2",
                children: [{ key: '4', label: "Вариант 2" }],
              },
            ],
          },
          {
            key: '5',
            label: "Вариант 3",
            children: [
              { key: '6', label: 'Чистовые' },
              { key: '7', label: 'Черновые' },
            ],
          },
        ],
      },
    ],
    children: 'Наведи на меня',
  },
};

export const Content: Story = {
  args: {
    content:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
    children: 'Наведи на меня',
  },
};

export const SelectableSingle: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.hover(canvas.getByText('Наведи на меня'));
    const option = await page.findByText('Вариант 2');
    await userEvent.click(option);
    await waitFor(() => expect(args.onSelect).toHaveBeenCalledWith(['2']));
    await waitFor(() => expect(option).not.toBeVisible());
  },
  args: {
    onClick: fn(),
    onSelect: fn(),
    items: [
      {
        key: '1',
        label: "Вариант 1",
        children: [{ key: '6', label: "Вариант 6", selectable: true }],
      },
      { key: '2', label: "Вариант 2", selectable: true },
      { key: '3', label: "Вариант 3", selectable: true },
      { key: '4', label: "Вариант 4" },
      { key: '5', label: "Вариант 5" },
    ],
    children: 'Наведи на меня',
  },
};

export const SelectableMultiple: Story = {
  args: {
    mode: 'multiple',
    onSelect: action('Dropdown selection changed'),
    items: [
      {
        key: '1',
        label: "Вариант 1",
        children: [{ key: '6', label: "Вариант 6", selectable: true }],
      },
      { key: '2', label: "Вариант 2", selectable: true },
      { key: '3', label: "Вариант 3", selectable: true },
      { key: '4', label: "Вариант 4" },
      { key: '5', label: "Вариант 5" },
    ],
    children: 'Наведи на меня',
  },
};
