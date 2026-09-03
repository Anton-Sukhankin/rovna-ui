import type { Meta, StoryObj } from '@storybook/react-vite';

import { Strong } from './Strong';

const meta: Meta<typeof Strong> = {
  title: 'Rovna UI/Typography/Strong',
  component: Strong,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};
