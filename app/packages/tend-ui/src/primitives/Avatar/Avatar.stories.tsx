import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { argTypes } from '@rovna-ui/tools';

import { Box, Space } from '@rovna-internal/components/grid';

import { Avatar } from './Avatar';
import { AvatarProps, status } from './types';
import { Radio } from '..';
import docs from './docs.json';
import demoImage from '../../stories/Figma/1.png';

const meta: Meta<typeof Avatar> = {
  title: 'Rovna UI/Main/Primitives/Avatar',
  component: Avatar,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

const src =
  '/media/demo-avatar.svg';

export const UnknownLarge: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-123&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  args: {
    size: 'large',
  },
};

export const UnknownMedium: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-125&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
};

export const UnknownSmall: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-127&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  args: {
    size: 'small',
  },
};

export const UnknownGroupLarge: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-147&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  args: {
    size: 'large',
    src: [],
  },
};

export const UnknownGroupMedium: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-149&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  args: {
    size: 'medium',
    src: [],
  },
};

export const UnknownGroupSmall: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-151&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  args: {
    size: 'small',
    src: [],
  },
};

export const ExtraLarge: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-135&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  args: {
    size: 'xl',
    src,
  },
};

export const Large: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-135&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  args: {
    size: 'large',
    src,
  },
};

export const Medium: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-137&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  args: {
    size: 'medium',
    src,
  },
};

export const Small: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-139&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  args: {
    size: 'small',
    src,
  },
};

export const Children: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-161&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  args: {
    children: 'AK',
  },
};

const FitTemplate = (args: AvatarProps) => {
  const [fit, setFit] = React.useState<'cover' | 'contain'>('contain');

  return (
    <Box $display='flex' $flexDirection='column' $gap={8}>
      <Radio.Group
        value={fit}
        onChange={e => {
          setFit(e.target.value);
        }}
        options={[
          { label: 'Вместить', value: 'contain' },
          { label: 'Заполнить', value: 'cover' },
        ]}
      />
      <Avatar {...args} fit={fit} />
    </Box>
  );
};
const FitCode = `
<Avatar fit="contain" src={...} />
`;
export const Fit: Story = {
  parameters: {
    docs: {
      source: {
        code: FitCode,
      },
    },
  },
  args: {
    fit: 'contain',
    src: demoImage,
  },
  render: FitTemplate,
};

export const Status: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-131&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  render: _args => {
    return (
      <Space>
        {status.map(value => (
          <Avatar key={value} src={src} status={value} />
        ))}
      </Space>
    );
  },
};

export const List: Story = {
  render: _args => {
    return (
      <Avatar.List>
        {Array.from({ length: 10 }).map((_, index) => (
          <Avatar key={index} src={src} />
        ))}
      </Avatar.List>
    );
  },
};

export const Max: Story = {
  render: _args => {
    return (
      <Avatar.List max={3}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Avatar key={index} src={src} />
        ))}
      </Avatar.List>
    );
  },
};

export const Composition: Story = {
  render: _args => (
    <Avatar.Root>
      <Avatar.Image />
      <Avatar.Fallback>AK</Avatar.Fallback>
    </Avatar.Root>
  ),
};

export const Bordered: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-137&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  args: {
    bordered: true,
    src,
  },
};

export const EXPERIMENTAL_DO_NOT_USE_IN_PRODUCTION_BorderColor: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/qNqMIRQuJq8Uaj1ZUNGErm/%F0%9F%9F%A1Avatar?type=design&node-id=108-137&mode=design&t=Ye2J04uGHYw35Ltf-4',
    },
  },
  args: {
    UNSTABLE_styling: {
      borderColor: 'red600',
    },
    bordered: true,
    src,
  },
};
