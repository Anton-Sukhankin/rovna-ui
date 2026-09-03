import type { Meta, StoryObj } from '@storybook/react-vite';

import { Image } from './Image';

const meta: Meta<typeof Image> = {
  title: 'Rovna UI/Main/UI/Image',
  component: Image,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: 'Пример изображения',
    src: '/media/demo-avatar.svg',
  },
};
