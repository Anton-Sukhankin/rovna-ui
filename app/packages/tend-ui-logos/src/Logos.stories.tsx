import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import * as Logos from '.';

// Создаем список всех доступных логотипов
const logoOptions = Object.keys(Logos).reduce((acc, key) => {
  acc[key] = key;

  return acc;
}, {} as Record<string, string>);

// Компонент для интерактивного отображения логотипа
const InteractiveLogo: React.FC<{
  selectedLogo: string;
  size?: number;
  color?: string;
  className?: string;
}> = ({ selectedLogo, ...props }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LogoComponent = (Logos as any)[selectedLogo];

  if (!LogoComponent) {
    return <div>Логотип не найден: {selectedLogo}</div>;
  }

  return <LogoComponent {...props} />;
};

const meta: Meta<typeof InteractiveLogo> = {
  title: 'Rovna UI/Logos/All',
  component: InteractiveLogo,
  argTypes: {
    size: {
      control: { type: 'number', min: 16, max: 200, step: 4 },
      description: 'Размер логотипа в пикселях',
    },
    color: {
      control: 'color',
      description: 'Цвет логотипа',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы',
    },
    selectedLogo: {
      control: 'select',
      options: logoOptions,
      description: 'Выберите логотип для отображения',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 60,
    selectedLogo: 'LK',
  },
};

export const All: Story = {
  args: {
    size: 24,
  },
  render: args => (
    <div>
      {Object.values(Logos).map(C => (
        <C key={C.displayName} title={C.displayName} {...args} />
      ))}
    </div>
  ),
};

export const TenDLogos: Story = {
  args: {
    size: 32,
  },
  render: args => (
    <div>
      {Object.values(Logos)
        .filter(C => C.displayName && C.displayName.includes('10D'))
        .map(C => {
          return <C key={C.displayName} title={C.displayName} {...args} />;
        })}
    </div>
  ),
};

export const OtherLogos: Story = {
  args: {
    size: 24,
  },
  render: args => (
    <div>
      {Object.values(Logos)
        .filter(C => C.displayName && !C.displayName.includes('10D'))
        .map(C => (
          <C key={C.displayName} title={C.displayName} {...args} />
        ))}
    </div>
  ),
};
