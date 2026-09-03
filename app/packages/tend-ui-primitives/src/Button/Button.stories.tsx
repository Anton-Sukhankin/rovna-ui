import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { useColors } from '@rovna-ui/theme';
import {
  AccountBox,
  ChevronDown,
  DoubleArrowVertical,
  FilterAlt,
  Home,
  MoreVert,
  Settings,
} from '@rovna-ui/icons';
import { GenericObject } from '@rovna-ui/components/types';
import { argTypes } from '@rovna-ui/tools';

import { Dot } from '@rovna-ui/primitives';

import docs from './docs.json';
import { Button } from './Button';
import { ButtonGroup } from './components';

const meta: Meta<typeof Button> = {
  title: 'Rovna UI/Primitives/Button',
  component: Button,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: "Кнопка" }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148796&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'primary',
    fullWidth: false,
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
    padding: true,
    onClick: fn(),
  },
};

export const Secondary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-149415&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'secondary',
    fullWidth: false,
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const Ghost: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148508&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'ghost',
    fullWidth: false,
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const GhostLink: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148510&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'link',
    fullWidth: false,
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const GhostPaddingless: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148510&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'link',
    fullWidth: false,
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
    padding: false,
  },
};

export const GhostPaddinglessWithBefore: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148516&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'link',
    fullWidth: false,
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
    padding: false,
    before: <ChevronDown />,
  },
};

export const GhostPaddinglessWithAfter: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148516&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'link',
    fullWidth: false,
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
    padding: false,
    after: <ChevronDown />,
  },
};

export const DangerPrimary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-149271&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'primary',
    fullWidth: false,
    preset: 'danger',
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const DangerGhost: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148985&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'ghost',
    fullWidth: false,
    danger: true,
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const DangerGhostLink: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148985&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'link',
    fullWidth: false,
    danger: true,
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const DangerGhostPaddingless: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148985&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'link',
    fullWidth: false,
    danger: true,
    loading: false,
    skeleton: false,
    disabled: false,
    padding: false,
  },
};

const AccentBackground = ({ children }: React.PropsWithChildren) => {
  const colors = useColors();

  return (
    <span
      style={{
        display: 'inline-block',
        background: colors.blue600,
        padding: '10px',
        borderRadius: '5px',
      }}
    >
      {children}
    </span>
  );
};

const withAccentBackground: Decorator = Story => (
  <AccentBackground>
    <Story />
  </AccentBackground>
);

export const AccentPrimary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148836&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'primary',
    fullWidth: false,
    preset: 'accent',
    loading: false,
    skeleton: false,
    disabled: false,
  },
  decorators: [withAccentBackground],
};

export const AccentGhost: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1729-7877&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'ghost',
    fullWidth: false,
    preset: 'accent',
    loading: false,
    skeleton: false,
    disabled: false,
  },
  decorators: [withAccentBackground],
};

export const AccentGhostLink: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1729-7871&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'link',
    fullWidth: false,
    preset: 'accent',
    loading: false,
    skeleton: false,
    disabled: false,
  },
  decorators: [withAccentBackground],
};

export const AccentGhostPaddingless: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1729-7871&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'link',
    fullWidth: false,
    preset: 'accent',
    loading: false,
    skeleton: false,
    disabled: false,
    padding: false,
  },
  decorators: [withAccentBackground],
};

export const PrimaryWithIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148800&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'primary',
    fullWidth: false,
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
};

export const SecondaryWithIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-149419&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'secondary',
    fullWidth: false,
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
};

export const GhostWithIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148516&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'ghost',
    fullWidth: false,
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
};

export const GhostLinkWithIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148519&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'link',
    fullWidth: false,
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
};

export const DangerPrimaryWithIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-149275&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'primary',
    fullWidth: false,
    danger: true,
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
};

export const DangerGhostWithIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148994&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'ghost',
    fullWidth: false,
    danger: true,
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
};

export const DangerGhostLinkWithIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148994&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'link',
    fullWidth: false,
    danger: true,
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
};

export const AccentPrimaryWithIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-150520&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'primary',
    fullWidth: false,
    preset: 'accent',
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
  decorators: [withAccentBackground],
};

export const AccentGhostWithIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1729-7858&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'ghost',
    fullWidth: false,
    preset: 'accent',
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
  decorators: [withAccentBackground],
};

export const AccentGhostLinkWithIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1729-7858&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'link',
    fullWidth: false,
    preset: 'accent',
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
  decorators: [withAccentBackground],
};

export const PrimaryIconOnly: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148810&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    'aria-label': 'Открыть список действий',
    before: <ChevronDown />,
    variant: 'primary',
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const SecondaryIconOnly: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-149429&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    'aria-label': 'Открыть список действий',
    after: <ChevronDown />,
    variant: 'secondary',
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const GhostIconOnly: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148536&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    'aria-label': 'Открыть список действий',
    before: <ChevronDown />,
    variant: 'ghost',
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const GhostLinkIconOnly: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-148536&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    'aria-label': 'Открыть меню',
    before: <ChevronDown />,
    variant: 'link',
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const DangerPrimaryIconOnly: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-149285&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    'aria-label': 'Открыть список действий',
    before: <ChevronDown />,
    variant: 'primary',
    danger: true,
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const DangerGhostIconOnly: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-149011&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    'aria-label': 'Открыть список действий',
    before: <ChevronDown />,
    variant: 'ghost',
    danger: true,
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const DangerGhostLinkIconOnly: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-149011&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    'aria-label': 'Открыть меню',
    before: <ChevronDown />,
    variant: 'link',
    danger: true,
    loading: false,
    skeleton: false,
    disabled: false,
  },
};

export const AccentPrimaryIconOnly: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1711-151012&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    'aria-label': 'Открыть список действий',
    variant: 'primary',
    fullWidth: false,
    preset: 'accent',
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
  decorators: [withAccentBackground],
};

export const AccentGhostIconOnly: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1729-7842&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    'aria-label': 'Открыть список действий',
    variant: 'ghost',
    fullWidth: false,
    preset: 'accent',
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
  decorators: [withAccentBackground],
};

export const AccentGhostLinkIconOnly: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Mnt69vxDaZKD0OqmIyCLz/%F0%9F%94%B5Button-%26-Link?type=design&node-id=1729-7842&mode=design&t=gKHymCWP54uaGCYW-4',
    },
  },
  args: {
    'aria-label': 'Открыть меню',
    variant: 'link',
    fullWidth: false,
    preset: 'accent',
    loading: false,
    skeleton: false,
    disabled: false,
    before: <ChevronDown />,
  },
  decorators: [withAccentBackground],
};

export const IconRight: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'primary',
    danger: false,
    loading: false,
    skeleton: false,
    disabled: false,
    after: <ChevronDown />,
  },
};

export const Loading: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('rovna-ui-button');
    await expect(button).toHaveClass('rovna-ui-button-loading');
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    children: "Кнопка",
    variant: 'primary',
    danger: false,
    loading: true,
    skeleton: false,
    disabled: false,
    onClick: fn(),
  },
};

export const IconOnlyLoading: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    'aria-label': 'Загрузка действия',
    before: <ChevronDown />,
    variant: 'primary',
    danger: false,
    loading: true,
    skeleton: false,
    disabled: false,
  },
};

export const Skeleton: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    children: "Кнопка",
    skeleton: true,
    fullWidth: false,
  },
};

export const TwoIcons: Story = {
  args: {
    children: "Кнопка",
    before: <AccountBox />,
    after: <Home />,
  },
};

export const FullWidth: Story = {
  args: {
    children: "Кнопка",
    fullWidth: true,
  },
};

export const As1: Story = {
  args: {
    children: "Кнопка",
    as: 'a',
    href: '#button-demo',
    target: '_blank',
  },
};

const As2Code = `
import { Link } from 'react-router-dom';

<Button as={Link} href="#button-demo">Кнопка</Button>
`;

export const As2: Story = {
  parameters: {
    docs: {
      source: {
        code: As2Code,
      },
    },
  },
  args: {
    children: "Кнопка",
    as: (props: GenericObject) => <a {...props} />,
    href: '#button-demo',
    target: '_blank',
  },
};

export const Margin1: Story = {
  args: {
    margin: '0 0 32px 0',
    children: "Кнопка",
  },
};

export const Margin2: Story = {
  args: {
    mt: '32px',
    children: "Кнопка",
  },
};

export const Margin3: Story = {
  args: {
    mr: 32,
    children: "Кнопка",
  },
};

export const Margin4: Story = {
  args: {
    mb: 32,
    children: "Кнопка",
  },
};

export const Margin5: Story = {
  args: {
    ml: 32,
    children: "Кнопка",
  },
};

export const Group: Story = {
  render: _props => (
    <ButtonGroup>
      <Dot inline={false} color='blue600' offset={[25, 10]} placement='leftTop'>
        <Button before={<FilterAlt />} variant='secondary'>
          Фильтры
        </Button>
      </Dot>
      <Button
        aria-label='Изменить порядок'
        before={<DoubleArrowVertical />}
        variant='secondary'
      />
      <Button
        aria-label='Открыть настройки'
        before={<Settings />}
        variant='secondary'
      />
      <Button
        aria-label='Открыть дополнительные действия'
        before={<MoreVert />}
        variant='secondary'
      />
    </ButtonGroup>
  ),
};
