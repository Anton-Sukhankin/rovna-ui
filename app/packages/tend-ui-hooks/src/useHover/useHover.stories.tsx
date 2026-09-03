import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { useHover } from './useHover';

const Component = () => {
  const [isHovered, listeners] = useHover();

  return (
    <div {...listeners}>
      <span>Наведи на меня</span>
      {isHovered && <div>Я появляюсь при наведении</div>}
    </div>
  );
};

const meta: Meta<typeof Component> = {
  title: 'Rovna UI/Hooks/useHover',
  component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultCode = `
const Component = () => {
  const [isHovered, listeners] = useHover();

  return (
    <div {...listeners}>
      <span>Наведи на меня</span>
      {isHovered && <div>Я появляюсь при наведении</div>}
    </div>
  );
};
`;
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: DefaultCode,
      },
    },
  },
};
