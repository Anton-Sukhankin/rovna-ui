import type { Meta, StoryObj } from '@storybook/react-vite';

import { Quote } from './Quote';

const meta: Meta<typeof Quote> = {
  title: 'Rovna UI/Typography/Quote',
  component: Quote,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};
