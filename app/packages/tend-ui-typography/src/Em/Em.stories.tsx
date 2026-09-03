import type { Meta, StoryObj } from '@storybook/react-vite';

import { Em } from './Em';

const meta: Meta<typeof Em> = {
  title: 'Rovna UI/Typography/Em',
  component: Em,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};
