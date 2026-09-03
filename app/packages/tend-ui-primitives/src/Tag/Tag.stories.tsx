import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { argTypes } from '@rovna-ui/tools';
import { Space } from '@rovna-ui/grid';
import { AccountBox } from '@rovna-ui/icons';

import { Tag } from './Tag';
import docs from './docs.json';

const meta: Meta<typeof Tag> = {
  title: 'Rovna UI/Primitives/Tag',
  component: Tag,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2896&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
  },
};

export const GrayAccent: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2894&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'gray',
  },
};

export const BlueAccent: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2898&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'blue',
  },
};

export const GeekblueAccent: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2902&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'geekblue',
  },
};

export const GreenAccent: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2906&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'green',
  },
};

export const YellowAccent: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2910&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'yellow',
  },
};

export const RedAccent: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2914&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'red',
  },
};

export const CyanAccent: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=592-3298&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'cyan',
  },
};

export const VolcanoAccent: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=592-3332&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'volcano',
  },
};

export const PurpleAccent: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=592-3353&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'purple',
  },
};

export const GrayLight: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2897&mode=design&t=zJvLAHwThi9qtLcY-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'gray-light',
  },
};

export const BlueLight: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2900&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'blue-light',
  },
};

export const GeekblueLight: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2904&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'geekblue-light',
  },
};

export const GreenLight: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2908&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'green-light',
  },
};

export const YellowLight: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2912&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'yellow-light',
  },
};

export const RedLight: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=3-2916&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'red-light',
  },
};

export const CyanLight: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=592-3300&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'cyan-light',
  },
};

export const VolcanoLight: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=592-3334&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'volcano-light',
  },
};

export const PurpleLight: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0q1GS1JDynUgM09tM4qeto/%F0%9F%94%B5Tag-%26-%F0%9F%9F%A1Counter?type=design&node-id=592-3355&mode=design&t=fXoRAhNFWDVJzlGe-4',
    },
  },
  args: {
    children: "Дизайн",
    preset: 'purple-light',
  },
};

export const Closable: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    children: "Дизайн",
    closable: true,
  },
};

export const Margin1: Story = {
  args: {
    margin: '0 0 32px 0',
    children: "Дизайн",
  },
};

export const Margin2: Story = {
  args: {
    mt: '32px',
    children: "Дизайн",
  },
};

export const Margin3: Story = {
  args: {
    mr: 32,
    children: "Дизайн",
  },
};

export const Margin4: Story = {
  args: {
    mb: 32,
    children: "Дизайн",
  },
};

export const Margin5: Story = {
  args: {
    ml: 32,
    children: "Дизайн",
  },
};

export const Padding: Story = {
  args: {
    padding: '8px',
    children: "Дизайн",
  },
};

export const BorderRadius1: Story = {
  args: {
    borderRadius: '0px',
    children: "Дизайн",
  },
};

export const BorderRadius2: Story = {
  args: {
    borderRadius: 0,
    children: "Дизайн",
  },
};

export const Customization1: Story = {
  args: {
    children: "Дизайн",
    color: 'white',
    backgroundColor: 'black',
  },
};

export const Customization2: Story = {
  args: {
    children: "Дизайн",
    color: 'gray0',
    backgroundColor: 'volcano700',
  },
};

export const WithIcon1: Story = {
  args: {
    before: <AccountBox />,
    children: "Дизайн",
    closable: true,
  },
};

export const WithIcon2: Story = {
  args: {
    after: <AccountBox />,
    children: "Дизайн",
    closable: true,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: "Дизайн",
  },
};

export const Shape: Story = {
  args: {
    size: 'large',
    shape: 'round',
    children: <AccountBox />,
  },
};

export const Example1: Story = {
  render: _args => {
    return (
      <Space>
        <Tag preset='geekblue'>В работе</Tag>
        <Tag preset='red'>Отказ</Tag>
        <Tag preset='yellow'>Тестирование</Tag>
        <Tag preset='green'>Готово</Tag>
      </Space>
    );
  },
};

export const Ellipsis: Story = {
  args: {
    ellipsis: true,
  },
  render: args => (
    <div style={{ width: '245px', border: '1px solid red' }}>
      <Tag {...args}>
        Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.
      </Tag>
      <Tag {...args}>Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.</Tag>
      <Tag {...args}>Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.</Tag>
    </div>
  ),
};
