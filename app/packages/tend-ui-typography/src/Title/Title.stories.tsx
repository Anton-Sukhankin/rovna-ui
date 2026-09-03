import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { argTypes } from '@rovna-ui/tools';

import { Title } from './Title';
import docs from './docs.json';

const meta: Meta<typeof Title> = {
  title: 'Rovna UI/Typography/Title',
  component: Title,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Display1: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=22-22254&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    children: "Крупный заголовок 1",
    level: 'd1',
  },
};
export const Display2: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=22-22223&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    children: "Крупный заголовок 2",
    level: 'd2',
  },
};
export const Heading1: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-23043&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    children: "Заголовок 1",
    level: 'h1',
  },
};
export const Heading2: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-23044&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    children: "Заголовок 2",
    level: 'h2',
  },
};
export const Heading3: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-23045&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    children: "Заголовок 3",
    level: 'h3',
  },
};
export const Heading4: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-23046&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    children: "Заголовок 4",
    level: 'h4',
  },
};
export const Heading5: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-23047&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    children: "Заголовок 5",
    level: 'h5',
  },
};
export const Heading6: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/k9R1zCVP2X70coFlWuUERl/%F0%9F%9F%A3Typography?type=design&node-id=23-23048&mode=design&t=TqmYMSUmQYiEb2GX-4',
    },
  },
  args: {
    children: "Заголовок 6",
    level: 'h6',
  },
};

export const Heading1Uppercase: Story = {
  args: {
    uppercase: true,
    children: "Заголовок 1",
    level: 'h1',
  },
};

export const Margin1: Story = {
  args: {
    children: "Заголовок 1",
    level: 'h1',
    margin: '0',
  },
  render: args => {
    return (
      <>
        Этот контент находится вплотную к заголовку
        <Title {...args} />И этот контент находится вплотную к заголовку
      </>
    );
  },
};

export const Margin2: Story = {
  args: {
    children: "Заголовок 1",
    level: 'h1',
    margin: '0 0 64px',
  },
  render: args => {
    return (
      <>
        <Title {...args} />
        Этот контент находится намного дальше чем обычно к заголовку
      </>
    );
  },
};
export const Margin3: Story = {
  args: {
    children: "Заголовок 1",
    level: 'h1',
    mb: '100px',
  },
  render: args => {
    return (
      <>
        <Title {...args} />
        Этот контент находится намного дальше чем обычно к заголовку
      </>
    );
  },
};
export const Margin4: Story = {
  args: {
    children: "Заголовок 1",
    level: 'h1',
    mt: '100px',
  },
  render: args => {
    return (
      <>
        Этот контент находится намного дальше чем обычно к заголовку
        <Title {...args} />
      </>
    );
  },
};

export const ColorPreset: Story = {
  args: {
    color: 'red500',
    children: "Заголовок 1",
  },
};

export const Color: Story = {
  args: {
    color: 'red',
    children: "Заголовок 1",
  },
};

export const Aligning: Story = {
  args: {
    textAlign: 'right',
    children: "Заголовок 1",
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
    children: "Заголовок",
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
    children: "Заголовок",
  },
};
