import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@rovna-internal/components/primitives/Button';
import { Box } from '@rovna-internal/components/grid/Box';
import { ChevronLeft } from '@rovna-internal/components/icons';
import { DetachedTabs } from '@rovna-internal/components/components';

import { Drawer } from './Drawer';
import { DrawerProps } from './types';

const meta: Meta<typeof Drawer> = {
  title: 'Rovna UI/Main/Primitives/Drawer',
  component: Drawer,
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultTemplate = (args: DrawerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Открыть
      </Button>
      <Drawer
        {...args}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dke35nKx9rDWbnqkHTQNtB/%F0%9F%94%B5Drawer?type=design&node-id=1251-102377&mode=design&t=FlyViBNbrHfuNQ3o-4',
    },
  },
  args: {
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
  render: DefaultTemplate,
};

export const Small: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dke35nKx9rDWbnqkHTQNtB/%F0%9F%94%B5Drawer?type=design&node-id=1251-102377&mode=design&t=ansKB51iIsQD4KX3-4',
    },
  },
  args: {
    size: 'small',
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
  render: DefaultTemplate,
};

export const Medium: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dke35nKx9rDWbnqkHTQNtB/%F0%9F%94%B5Drawer?type=design&node-id=803-11950&mode=design&t=ansKB51iIsQD4KX3-4',
    },
  },
  args: {
    size: 'medium',
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
  render: DefaultTemplate,
};

export const Large: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dke35nKx9rDWbnqkHTQNtB/%F0%9F%94%B5Drawer?type=design&node-id=1251-102497&mode=design&t=ansKB51iIsQD4KX3-4',
    },
  },
  args: {
    size: 'large',
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
  render: DefaultTemplate,
};

export const Scroll: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dke35nKx9rDWbnqkHTQNtB/%F0%9F%94%B5Drawer?type=design&node-id=1251-102362&mode=design&t=FlyViBNbrHfuNQ3o-4',
    },
  },
  args: {
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
  render: DefaultTemplate,
};

const PlacementTemplate = (args: DrawerProps) => {
  const [visible, setVisible] = React.useState(false);
  const [placement, setPlacement] = React.useState<DrawerProps['placement']>();

  return (
    <>
      <Box $display='flex' $gap={8}>
        <Button
          onClick={() => {
            setVisible(true);
            setPlacement('top');
          }}
        >
          Сверху
        </Button>
        <Button
          onClick={() => {
            setVisible(true);
            setPlacement('right');
          }}
        >
          Справа
        </Button>
        <Button
          onClick={() => {
            setVisible(true);
            setPlacement('bottom');
          }}
        >
          Снизу
        </Button>
        <Button
          onClick={() => {
            setVisible(true);
            setPlacement('left');
          }}
        >
          Слева
        </Button>
      </Box>
      <Drawer
        {...args}
        open={visible}
        placement={placement}
        key={placement}
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
};
export const Placement: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dke35nKx9rDWbnqkHTQNtB/%F0%9F%94%B5Drawer?type=design&node-id=1251-102362&mode=design&t=FlyViBNbrHfuNQ3o-4',
    },
  },
  args: {
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
  render: PlacementTemplate,
};

export const FullScreen1: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dke35nKx9rDWbnqkHTQNtB/%F0%9F%94%B5Drawer?type=design&node-id=803-11523&mode=design&t=FlyViBNbrHfuNQ3o-4',
    },
  },
  args: {
    fullscreen: true,
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
  render: DefaultTemplate,
};

export const FullScreen2: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dke35nKx9rDWbnqkHTQNtB/%F0%9F%94%B5Drawer?type=design&node-id=803-11523&mode=design&t=FlyViBNbrHfuNQ3o-4',
    },
  },
  args: {
    fullscreen: true,
    placement: 'left',
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
  render: DefaultTemplate,
};

export const FullScreen3: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dke35nKx9rDWbnqkHTQNtB/%F0%9F%94%B5Drawer?type=design&node-id=803-11523&mode=design&t=FlyViBNbrHfuNQ3o-4',
    },
  },
  args: {
    fullscreen: true,
    placement: 'top',
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
  render: DefaultTemplate,
};

export const FullScreen4: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/dke35nKx9rDWbnqkHTQNtB/%F0%9F%94%B5Drawer?type=design&node-id=803-11523&mode=design&t=FlyViBNbrHfuNQ3o-4',
    },
  },
  args: {
    fullscreen: true,
    placement: 'bottom',
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
  render: DefaultTemplate,
};

export const NoFooter: Story = {
  args: {
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
    footer: null,
  },
  render: DefaultTemplate,
};

const NoBackdropCode = `
<Drawer mask={false} maskClosable={false} title='Заголовок' description='Описание'>
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam neque quidem, commodi
  voluptatum alias labore ratione soluta doloremque enim error?
</Drawer>
`;
export const NoBackdrop: Story = {
  parameters: {
    docs: {
      source: {
        code: NoBackdropCode,
      },
    },
  },
  args: {
    mask: false,
    maskClosable: false,
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
  render: DefaultTemplate,
};

export const Before: Story = {
  args: {
    before: <ChevronLeft />,
    title: 'Заголовок',
    description: 'Описание',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
  render: DefaultTemplate,
};

const TabsTemplate = (_args: unknown) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Открыть
      </Button>
      <DetachedTabs.Root
        items={[
          { key: 'key1', label: 'Новые', children: 'Контент вкладки "Новые"' },
          { key: 'key2', label: 'Входящие', children: 'Контент вкладки "Входящие"' },
          { key: 'key4', label: 'Сотрудник', children: 'Контент вкладки "Сотрудник"' },
          {
            key: 'key5',
            label: 'На проверке',
            children: 'Контент вкладки "На проверке"',
          },
          { key: 'key6', label: 'Черновик', children: 'Контент вкладки "Черновик"' },
        ]}
      >
        <Drawer
          open={open}
          above={<DetachedTabs.Buttons />}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DetachedTabs.Content />
        </Drawer>
      </DetachedTabs.Root>
    </>
  );
};

export const Tabs: Story = {
  render: TabsTemplate,
};
