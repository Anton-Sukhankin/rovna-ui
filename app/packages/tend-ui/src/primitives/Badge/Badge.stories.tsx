import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { argTypes } from '@rovna-ui/tools';

import { AccountBox } from '@rovna-internal/components/icons';

import { Badge } from './Badge';
import { BadgeProps } from './types';
import { Button } from '../Button';
import docs from './docs.json';

const meta: Meta<typeof Badge> = {
  title: 'Rovna UI/Main/Primitives/Badge',
  component: Badge,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    preset: 'default',
  },
};

export const Success: Story = {
  args: {
    preset: 'success',
  },
};

export const Warning: Story = {
  args: {
    preset: 'warning',
  },
};

export const Processing: Story = {
  args: {
    preset: 'processing',
  },
};

export const Error: Story = {
  args: {
    preset: 'error',
  },
};

export const DefaultWithAfterContent: Story = {
  args: {
    preset: 'default',
    after: "По умолчанию",
  },
};

export const SuccessWithAfterContent: Story = {
  args: {
    preset: 'success',
    after: "Успешно",
  },
};

export const WarningWithAfterContent: Story = {
  args: {
    preset: 'warning',
    after: "Предупреждение",
  },
};

export const ProcessingWithAfterContent: Story = {
  args: {
    preset: 'processing',
    after: 'Processing',
  },
};

export const ErrorWithAfterContent: Story = {
  args: {
    preset: 'error',
    after: "Ошибка",
  },
};

export const DefaultWithBeforeContent: Story = {
  args: {
    preset: 'default',
    before: "По умолчанию",
  },
};

export const SuccessWithBeforeContent: Story = {
  args: {
    preset: 'success',
    before: "Успешно",
  },
};

export const WarningWithBeforeContent: Story = {
  args: {
    preset: 'warning',
    before: "Предупреждение",
  },
};

export const ProcessingWithBeforeContent: Story = {
  args: {
    preset: 'processing',
    before: 'Processing',
  },
};

export const ErrorWithBeforeContent: Story = {
  args: {
    preset: 'error',
    before: "Ошибка",
  },
};

export const Gray: Story = {
  args: {
    preset: 'gray',
    inner: 'Badge Color',
  },
};

export const Blue: Story = {
  args: {
    preset: 'blue',
    inner: 'Badge Color',
  },
};

export const Geekblue: Story = {
  args: {
    preset: 'geekblue',
    inner: 'Badge Color',
  },
};

export const Green: Story = {
  args: {
    preset: 'green',
    inner: 'Badge Color',
  },
};

export const Yellow: Story = {
  args: {
    preset: 'yellow',
    inner: 'Badge Color',
  },
};

export const Red: Story = {
  args: {
    preset: 'red',
    inner: 'Badge Color',
  },
};

export const Cyan: Story = {
  args: {
    preset: 'cyan',
    inner: 'Badge Color',
  },
};

export const Volcano: Story = {
  args: {
    preset: 'volcano',
    inner: 'Badge Color',
  },
};

export const Purple: Story = {
  args: {
    preset: 'purple',
    inner: 'Badge Color',
  },
};

export const GrayLight: Story = {
  args: {
    preset: 'gray-light',
    inner: 'Badge Color',
  },
};

export const BlueLight: Story = {
  args: {
    preset: 'blue-light',
    inner: 'Badge Color',
  },
};

export const GeekblueLight: Story = {
  args: {
    preset: 'geekblue-light',
    inner: 'Badge Color',
  },
};

export const GreenLight: Story = {
  args: {
    preset: 'green-light',
    inner: 'Badge Color',
  },
};

export const YellowLight: Story = {
  args: {
    preset: 'yellow-light',
    inner: 'Badge Color',
  },
};

export const RedLight: Story = {
  args: {
    preset: 'red-light',
    inner: 'Badge Color',
  },
};

export const CyanLight: Story = {
  args: {
    preset: 'cyan-light',
    inner: 'Badge Color',
  },
};

export const VolcanoLight: Story = {
  args: {
    preset: 'volcano-light',
    inner: 'Badge Color',
  },
};

export const PurpleLight: Story = {
  args: {
    preset: 'purple-light',
    inner: 'Badge Color',
  },
};

export const Counter1: Story = {
  args: {
    inner: 110,
    children: <AccountBox />,
  },
};

export const Counter2: Story = {
  args: {
    inner: 110,
    preset: 'blue',
  },
};

export const Counter3: Story = {
  args: {
    children: <AccountBox />,
    inner: <AccountBox />,
    preset: 'yellow',
  },
};

export const Dot: Story = {
  args: {
    children: <AccountBox />,
  },
};

export const Max: Story = {
  args: {
    inner: 1000,
    max: 999,
  },
};

export const Offset: Story = {
  args: {
    inner: 110,
    children: <AccountBox />,
    offset: [8, 10],
  },
};

export const Placement: Story = {
  args: {
    placement: 'leftBottom',
    children: <AccountBox />,
    offset: [0, 0],
  },
};

const ShowZeroCode = `
<Badge showZero inner={0}>
  <AccountBox />
</Badge>
`;
const ShowZeroTemplate = (args: BadgeProps) => {
  const [inner, setInner] = React.useState(0);

  return (
    <div>
      <div>
        <Badge {...args} inner={inner} />
      </div>
      <Button
        onClick={() => {
          setInner(p => p - 1);
        }}
      >
        -
      </Button>
      <Button
        onClick={() => {
          setInner(p => p + 1);
        }}
      >
        +
      </Button>
    </div>
  );
};
export const ShowZero: Story = {
  args: {
    showZero: true,
    max: 10,
    inner: 0,
    children: <AccountBox />,
  },
  render: args => <ShowZeroTemplate {...args} />,
  parameters: {
    docs: { source: { code: ShowZeroCode } },
  },
};

export const CounterWithBefore: Story = {
  args: {
    before: 'Before',
    inner: 110,
    preset: 'blue',
  },
};

export const CounterWithAfter: Story = {
  args: {
    after: 'After',
    inner: 110,
    preset: 'blue',
  },
};
