import type { Meta, StoryObj } from '@storybook/react-vite';
import { argTypes } from '@rovna-ui/tools';

import { Text } from './Text';
import docs from './docs.json';

const meta: Meta<typeof Text> = {
  title: 'Rovna UI/Typography/Text',
  component: Text,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BodyMedium: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-23620&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const BodyLarge: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-23613&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    size: 'large',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const BodySmall: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-23627&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    size: 'small',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const BodyXs: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-24136&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    size: 'xs',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const LeadMedium: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-23619&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    strong: true,
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const LeadLarge: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-23612&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    size: 'large',
    strong: true,
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const BodyUppercase: Story = {
  args: {
    uppercase: true,
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const ColorPreset: Story = {
  args: {
    color: 'red500',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const Color: Story = {
  args: {
    color: '#B00020',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const Aligning: Story = {
  args: {
    textAlign: 'right',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const FontWeight: Story = {
  args: {
    fontWeight: '100',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const WhiteSpace: Story = {
  args: {
    whiteSpace: 'pre',
    children: "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.",
  },
};

export const Margin1: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    margin: '0 0 32px',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const Margin2: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    mb: '100px',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const Margin3: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    mt: 100,
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const CapitalizedMedium: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-24135&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    uppercase: true,
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const CapitalizedSmall: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-24136&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    size: 'xs',
    uppercase: true,
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const Width1: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    width: '100px',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};

export const Width2: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    width: 100,
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
  },
};
