import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@rovna-internal/components/primitives/Button';
import { Space } from '@rovna-internal/components/grid';
import { Link } from '@rovna-internal/components/typography';

import { Dialog } from './Dialog';
import { DialogMethodConfirmProps, DialogMethodProps } from './types';
import demoImage from '../../stories/Figma/1.png';

const meta: Meta = {
  title: 'Rovna UI/Main/Primitives/Dialog',
  decorators: [
    Story => {
      return (
        <>
          <Dialog.Styles />
          <Story />
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const src = demoImage;

const Template: React.FC<{
  config: DialogMethodProps | DialogMethodConfirmProps;
  method: 'confirm' | 'success' | 'error' | 'warning' | 'info';
}> = ({ method, config, children }) => {
  const [methods, context] = Dialog.useDialog();

  return (
    <Space>
      {context}
      <Button
        onClick={() => {
          Dialog[method](config);
        }}
      >
        {children}
      </Button>
      <Button
        onClick={() => {
          methods[method](config);
        }}
      >
        {children} (hook API)
      </Button>
    </Space>
  );
};

export const Default: Story = {
  render: () => (
    <Template
      config={{
        title: 'Заголовок в одну или несколько строк',
        content: 'Текст модального окна в одну или несколько строк',
      }}
      method='confirm'
    >
      По умолчанию
    </Template>
  ),
};

export const Image: Story = {
  render: () => (
    <Template
      config={{
        title: 'Заголовок в одну или несколько строк',
        content: 'Текст модального окна в одну или несколько строк',
        image: {
          src,
        },
      }}
      method='confirm'
    >
      Изображение
    </Template>
  ),
};

export const ImageCover: Story = {
  render: () => (
    <Template
      config={{
        title: 'Заголовок в одну или несколько строк',
        content: 'Текст модального окна в одну или несколько строк',
        image: {
          src,
          layout: 'cover',
        },
      }}
      method='confirm'
    >
      Подтвердить
    </Template>
  ),
};

export const Success: Story = {
  render: () => (
    <Template
      config={{
        title: 'Заголовок в одну или несколько строк',
        content: 'Текст модального окна в одну или несколько строк',
        image: {
          src,
        },
      }}
      method='success'
    >
      Успешно
    </Template>
  ),
};

export const Error: Story = {
  render: () => (
    <Template
      config={{
        title: 'Заголовок в одну или несколько строк',
        content: 'Текст модального окна в одну или несколько строк',
        image: {
          src,
        },
      }}
      method='error'
    >
      Ошибка
    </Template>
  ),
};

export const Warning: Story = {
  render: () => (
    <Template
      config={{
        title: 'Заголовок в одну или несколько строк',
        content: 'Текст модального окна в одну или несколько строк',
        image: {
          src,
        },
      }}
      method='warning'
    >
      Предупреждение
    </Template>
  ),
};

export const Info: Story = {
  render: () => (
    <Template
      config={{
        title: 'Заголовок в одну или несколько строк',
        content: 'Текст модального окна в одну или несколько строк',
        image: {
          src,
        },
      }}
      method='info'
    >
      Информация
    </Template>
  ),
};

export const Async: Story = {
  render: () => (
    <Template
      config={{
        title: 'Заголовок в одну или несколько строк',
        content: 'Текст модального окна в одну или несколько строк',
        image: {
          src,
        },
        onOk: () => {
          return new Promise(resolve => {
            setTimeout(resolve, 2000);
          });
        },
        onCancel: () => {
          return new Promise(resolve => {
            setTimeout(resolve, 2000);
          });
        },
      }}
      method='info'
    >
      Информация
    </Template>
  ),
};

export const Extra: Story = {
  render: () => (
    <Template
      config={{
        title: 'Заголовок в одну или несколько строк',
        image: { src },
        content: (
          <>
            Текст модального окна в одну или несколько
            <Link>Пользовательское соглашение</Link>
          </>
        ),
      }}
      method='info'
    >
      Информация
    </Template>
  ),
};
