import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronDown } from '@rovna-ui/icons';
import { argTypes } from '@rovna-ui/tools';

import { Link } from './Link';
import docs from './docs.json';

const meta: Meta<typeof Link> = {
  title: 'Rovna UI/Typography/Link',
  component: Link,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=136-9524&mode=design&t=t112eti9UmSe6GNW-4',
    },
  },
  args: {
    size: 'medium',
    href: '/',
    target: '_blank',
    children: "Текст ссылки",
  },
};

export const Large: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=2882-1968&mode=design&t=t112eti9UmSe6GNW-4',
    },
  },
  args: {
    size: 'large',
    href: '/',
    target: '_blank',
    children: "Текст ссылки",
  },
};

export const Small: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=2882-2021&mode=design&t=t112eti9UmSe6GNW-4',
    },
  },
  args: {
    size: 'small',
    href: '/',
    target: '_blank',
    children: "Текст ссылки",
  },
};

export const Primary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=136-9524&mode=design&t=t112eti9UmSe6GNW-4',
    },
  },
  args: {
    href: '/',
    target: '_blank',
    children: "Текст ссылки",
  },
};

export const Danger: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=136-9524&mode=design&t=t112eti9UmSe6GNW-4',
    },
  },
  args: {
    href: '/',
    target: '_blank',
    type: 'danger',
    children: "Текст ссылки",
  },
};

export const Disabled: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=136-9524&mode=design&t=t112eti9UmSe6GNW-4',
    },
  },
  args: {
    href: '/',
    target: '_blank',
    disabled: true,
    children: "Текст ссылки",
  },
};

export const Uppercase: Story = {
  args: {
    href: '/',
    target: '_blank',
    uppercase: true,
    children: "Текст ссылки",
  },
};

export const PrimaryWithIcon: Story = {
  render: args => (
    <Link {...args} before={<ChevronDown />}>
      Текст ссылки
    </Link>
  ),
};

export const DangerWithIcon: Story = {
  args: {
    href: '/',
    target: '_blank',
    type: 'danger',
  },
  render: args => (
    <Link {...args} before={<ChevronDown />}>
      Текст ссылки
    </Link>
  ),
};

export const DisabledWithIcon: Story = {
  args: {
    href: '/',
    target: '_blank',
    disabled: true,
  },
  render: args => (
    <Link {...args} before={<ChevronDown />}>
      Текст ссылки
    </Link>
  ),
};

export const PrimaryWithRightIcon: Story = {
  render: args => (
    <Link {...args} after={<ChevronDown />}>
      Текст ссылки
    </Link>
  ),
};

export const DangerWithRightIcon: Story = {
  args: {
    href: '/',
    target: '_blank',
    type: 'danger',
  },
  render: args => (
    <Link {...args} after={<ChevronDown />}>
      Текст ссылки
    </Link>
  ),
};

export const DisabledWithRightIcon: Story = {
  args: {
    href: '/',
    target: '_blank',
    disabled: true,
  },
  render: args => (
    <Link {...args} after={<ChevronDown />}>
      Текст ссылки
    </Link>
  ),
};

export const Aligning: Story = {
  args: {
    textAlign: 'right',
    children:
      "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными. Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса. Это пример текста для проверки отображения компонента.",
  },
};

export const Underline: Story = {
  args: {
    underline: true,
    children: "Текст ссылки",
  },
};

export const UnderlineWithIcon: Story = {
  args: {
    before: <ChevronDown />,
    underline: true,
    children: "Текст ссылки",
  },
};
