import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Paragraph } from '@rovna-internal/components/typography';

import { Status } from './Status';

const meta: Meta<typeof Status> = {
  title: 'Rovna UI/Main/Components/Status',
  component: Status,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Forbidden: Story = {
  args: {
    status: 403,
    onClick: action('Status action clicked'),
  },
};

export const NotFound: Story = {
  args: {
    status: 404,
  },
};

export const InternalServerError: Story = {
  args: {
    status: 500,
  },
};

export const Title1: Story = {
  args: {
    title: "Заголовок 1",
  },
};

export const Title2: Story = {
  args: {
    title: <div>Заголовок 2</div>,
  },
};

export const Description1: Story = {
  args: {
    description: "Описание 1",
  },
};

export const Description2: Story = {
  args: {
    description: <div>Описание 2</div>,
  },
};

export const Button: Story = {
  args: {
    button: {
      preset: 'danger',
      children: 'Обновить',
    },
  },
};

export const Content: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Применимо только для `status={403}`',
      },
    },
  },
  args: {
    status: 403,
    onClick: action('Status action clicked'),
    content: (
      <Paragraph>
        Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.
      </Paragraph>
    ),
  },
};
