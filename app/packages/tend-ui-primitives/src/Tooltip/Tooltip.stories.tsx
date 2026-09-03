import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Rovna UI/Primitives/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.hover(canvas.getByText('Наведите курсор'));
    await waitFor(() => {
      const tooltip = page.getAllByRole('tooltip').find(element => isVisible(element));
      expect(tooltip).toBeDefined();
    }, { timeout: 5_000 });
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xQt4wUntdZuq9Obx56Epbe/%F0%9F%94%B5Popover-%26-Tooltip?type=design&node-id=3-1688&mode=design&t=hhRc3dL0zrg7ikRH-4',
    },
  },
  args: {
    title:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
    children: "Наведите курсор",
  },
};

export const WithBreakers: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xQt4wUntdZuq9Obx56Epbe/%F0%9F%94%B5Popover-%26-Tooltip?type=design&node-id=3-1688&mode=design&t=hhRc3dL0zrg7ikRH-4',
    },
  },
  args: {
    lineBreak: true,
    title: ['First sentence', 'Second sentence', 'Third sentence'].join('\n'),
    children: "Наведите курсор",
  },
};
