import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { argTypes } from '@rovna-ui/tools';

import { House, OpenInNew } from '@rovna-internal/components/icons';

import { Alert } from './Alert';
import { Button } from '../Button';
import docs from './docs.json';

const meta: Meta<typeof Alert> = {
  title: 'Rovna UI/Main/Primitives/Alert',
  component: Alert,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Ix5ETADeG9KX5iHtcVtNd9/Gray-Alert?type=design&node-id=411-1939&mode=design&t=Ii8lb4QvL4l9Rx4y-4',
    },
  },
  args: {
    type: 'success',
    message: "Заголовок",
    description: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
  },
};

export const Error: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Ix5ETADeG9KX5iHtcVtNd9/Gray-Alert?type=design&node-id=203-5133&mode=design&t=Ii8lb4QvL4l9Rx4y-4',
    },
  },
  args: {
    type: 'error',
    message: "Заголовок",
    description: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
  },
};

export const Warning: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Ix5ETADeG9KX5iHtcVtNd9/Gray-Alert?type=design&node-id=413-2925&mode=design&t=Ii8lb4QvL4l9Rx4y-4',
    },
  },
  args: {
    type: 'warning',
    message: "Заголовок",
    description: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
  },
};

export const Info: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Ix5ETADeG9KX5iHtcVtNd9/Gray-Alert?type=design&node-id=716-9860&mode=design&t=Ii8lb4QvL4l9Rx4y-4',
    },
  },
  args: {
    type: 'info',
    message: "Заголовок",
    description: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
  },
};

export const Neutral: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Устарел начиная с версии `4.11.0`. За более подробной информацией обращайтесь в чат `S.RovnaUI Support`',
      },
    },
  },
  args: {
    type: 'neutral',
    message: "Заголовок",
    description: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      title: '',
      description: {
        story:
          'Устарел начиная с версии `4.11.0`. За более подробной информацией обращайтесь в чат `S.RovnaUI Support`',
      },
    },
  },
  args: {
    type: 'loading',
    message: "Заголовок",
    description: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
  },
};

export const NoDescription: Story = {
  args: {
    type: 'success',
    message: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
  },
};

export const Icon: Story = {
  args: {
    type: 'success',
    message: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
    icon: <House size={20} color='red' />,
  },
};

export const Closable: Story = {
  args: {
    closable: true,
    type: 'success',
    message: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
  },
};

export const Footer1: Story = {
  args: {
    type: 'success',
    message: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
    footer: [
      <Button key='extra' before={<OpenInNew />} padding={false} variant='link'>
        Кнопка
      </Button>,
    ],
  },
};

export const Footer2: Story = {
  args: {
    type: 'success',
    message: "Заголовок",
    description: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
    footer: [
      <Button key='extra' before={<OpenInNew />} padding={false} variant='link'>
        Кнопка
      </Button>,
    ],
  },
};

export const Footer3: Story = {
  args: {
    type: 'success',
    message: "Заголовок",
    description: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
    footer: [
      <Button preset='danger' key='button-1'>
        Кнопка
      </Button>,
      <Button key='button-2'>Кнопка</Button>,
    ],
  },
};

export const Margin: Story = {
  args: {
    type: 'info',
    message: "Заголовок",
    description: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
    mt: 24,
  },
};
