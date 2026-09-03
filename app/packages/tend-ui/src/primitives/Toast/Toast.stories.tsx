import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button } from '@rovna-internal/components/primitives/Button';
import { OpenInNew } from '@rovna-internal/components/icons';

import { Toast } from './Toast';

Toast.init();

const meta: Meta = {
  title: 'Rovna UI/Main/Primitives/Toast',
  decorators: [
    Story => {
      return (
        <>
          <Toast.Styles />
          <Story />
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const duration = 600000;

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

export const Success: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Успешно' }));
    await waitFor(() => {
      const description = page.getAllByText('Описание').find(element => isVisible(element));
      expect(description).toBeDefined();
    }, { timeout: 5_000 });
  },
  render: _args => {
    return (
      <>
        <Button
          onClick={() => {
            Toast.success({
              message: "Успешно",
              description: "Описание",
              duration,
            });
          }}
        >
          Успешно
        </Button>
      </>
    );
  },
};

export const Error: Story = {
  render: _args => {
    return (
      <>
        <Button
          onClick={() => {
            Toast.error({
              message: "Ошибка",
              description: "Пример текста",
              duration,
            });
          }}
        >
          Ошибка
        </Button>
      </>
    );
  },
};

export const Warning: Story = {
  render: _args => {
    return (
      <>
        <Button
          onClick={() => {
            Toast.warning({
              message: "Предупреждение",
              description: "Пример текста",
              duration,
            });
          }}
        >
          Предупреждение
        </Button>
      </>
    );
  },
};

export const Info: Story = {
  render: _args => {
    return (
      <>
        <Button
          onClick={() => {
            Toast.info({
              message: "Информация",
              description: "Пример текста",
              duration,
            });
          }}
        >
          Информация
        </Button>
      </>
    );
  },
};

export const Neutral: Story = {
  render: _args => {
    return (
      <>
        <Button
          onClick={() => {
            Toast.neutral({
              message: "Нейтральное",
              description: "Пример текста",
              duration,
            });
          }}
        >
          Нейтральное
        </Button>
      </>
    );
  },
};

export const Loading: Story = {
  render: _args => {
    return (
      <>
        <Button
          onClick={() => {
            Toast.loading({
              message: "Загрузка",
              description: "Пример текста",
              duration,
            });
          }}
        >
          Загрузка
        </Button>
      </>
    );
  },
};

export const NoDescription: Story = {
  render: _args => {
    return (
      <>
        <Button
          onClick={() => {
            Toast.success({
              message: "Без описания",
              duration,
            });
          }}
        >
          Без описания
        </Button>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: _args => {
    return (
      <>
        <Button
          onClick={() => {
            Toast.success({
              message: "С действиями",
              description: "Пример текста",
              footer: [
                <Button
                  key='button-1'
                  padding={false}
                  variant='link'
                  before={<OpenInNew />}
                >
                  Кнопка 1
                </Button>,
                <Button
                  key='button-2'
                  padding={false}
                  variant='link'
                  before={<OpenInNew />}
                >
                  Кнопка 2
                </Button>,
              ],
            });
          }}
        >
          С действиями
        </Button>
      </>
    );
  },
};
