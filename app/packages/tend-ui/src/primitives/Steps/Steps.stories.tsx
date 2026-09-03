import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Title } from '@rovna-ui/typography/Title';

import { Steps } from './Steps';
import { currentStepGroup, currentStepUsers, items, steps } from './data';
import { StepsProps } from './types';

const meta: Meta<typeof Steps> = {
  title: 'Rovna UI/Main/Primitives/Steps',
  component: Steps,
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultLargeTemplate = (args: StepsProps) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <>
      <Steps current={current} onChange={setCurrent} {...args} />
    </>
  );
};

export const DefaultLarge: Story = {
  args: {
    items: [
      {
        title: 'Заголовок 1',
        description: 'Описание 1',
      },
      {
        title: 'Заголовок 2',
        description: 'Описание 2',
      },
      {
        title: 'Заголовок 3',
        description: 'Описание 3',
      },
    ],
  },
  render: DefaultLargeTemplate,
};

const DisabledTemplate = (args: StepsProps) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <>
      <Steps current={current} onChange={setCurrent} {...args} />
    </>
  );
};

export const Disabled: Story = {
  args: {
    items: [
      {
        title: 'Заголовок 1',
        description: 'Описание 1',
      },
      {
        title: 'Заголовок 2',
        description: 'Описание 2',
      },
      {
        title: 'Заголовок 3',
        description: 'Описание 3',
        disabled: true,
      },
    ],
  },
  render: DisabledTemplate,
};

const StatusTemplate = (args: StepsProps) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <>
      <Steps current={current} onChange={setCurrent} {...args} />
    </>
  );
};

export const Status: Story = {
  args: {
    items: [
      {
        title: 'Заголовок 1',
        description: 'Описание 1',
      },
      {
        title: 'Заголовок 2',
        description: 'Описание 2',
        status: 'error',
      },
      {
        title: 'Заголовок 3',
        description: 'Описание 3',
        disabled: true,
      },
    ],
  },
  render: StatusTemplate,
};

const VerticalLargeTemplate = (args: StepsProps) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <>
      <Steps current={current} onChange={setCurrent} {...args} />
    </>
  );
};

export const VerticalLarge: Story = {
  args: {
    items: [
      {
        title: 'Заголовок 1',
        description: 'Описание 1',
      },
      {
        title: 'Заголовок 2',
        description: 'Описание 2',
      },
      {
        title: 'Заголовок 3',
        description: 'Описание 3',
      },
    ],
    direction: 'vertical',
  },
  render: VerticalLargeTemplate,
};

export const Children: Story = {
  args: {
    items: [
      {
        title: 'Заголовок 1',
        description: 'Описание 1',
        children: (
          <Title margin='0' level='h5'>
            Контент 1
          </Title>
        ),
      },
      {
        title: 'Заголовок 2',
        description: 'Описание 2',
        children: (
          <Title margin='0' level='h5'>
            Контент 2
          </Title>
        ),
      },
      {
        title: 'Заголовок 3',
        description: 'Описание 3',
        children: (
          <Title margin='0' level='h5'>
            Контент 3
          </Title>
        ),
      },
    ],
  },
  render: DefaultLargeTemplate,
};

export const ChildrenVertical: Story = {
  args: {
    direction: 'vertical',
    items: [
      {
        title: 'Заголовок 1',
        description: 'Описание 1',
        children: (
          <Title margin='0' level='h5'>
            Контент 1
          </Title>
        ),
      },
      {
        title: 'Заголовок 2',
        description: 'Описание 2',
        children: (
          <Title margin='0' level='h5'>
            Контент 2
          </Title>
        ),
      },
      {
        title: 'Заголовок 3',
        description: 'Описание 3',
        children: (
          <Title margin='0' level='h5'>
            Контент 3
          </Title>
        ),
      },
    ],
  },
  render: DefaultLargeTemplate,
};

export const VerticalMedium: Story = {
  args: {
    items: steps,
    variant: 'medium',
    direction: 'vertical',
  },
  render: DefaultLargeTemplate,
};

export const DefaultMedium: Story = {
  args: {
    items: steps,
    variant: 'medium',
    direction: 'horizontal',
  },
  render: DefaultLargeTemplate,
};

export const HistoryMedium: Story = {
  args: {
    current: undefined,
    items,
    currentApprovalUsers: currentStepUsers,
    currentApprovalGroups: currentStepGroup,
    variant: 'medium',
  },
  render: DefaultLargeTemplate,
};

export const HistoryMediumOnlyUsers: Story = {
  args: {
    current: undefined,
    items,
    currentApprovalUsers: currentStepUsers,
    variant: 'medium',
  },
  render: DefaultLargeTemplate,
};

export const HistoryMediumOnlyGroups: Story = {
  args: {
    current: undefined,
    items,
    currentApprovalGroups: currentStepGroup,
    variant: 'medium',
  },
  render: DefaultLargeTemplate,
};

export const HistoryMediumWithoutAvatar: Story = {
  args: {
    current: undefined,
    items,
    currentApprovalUsers: currentStepUsers,
    currentApprovalGroups: currentStepGroup,
    showAvatar: false,
    variant: 'medium',
  },
  render: DefaultLargeTemplate,
};

export const HistoryMediumFinished: Story = {
  args: {
    current: undefined,
    items,
    variant: 'medium',
  },
  render: DefaultLargeTemplate,
};

export const VerticalSmall: Story = {
  args: {
    items: steps,
    variant: 'small',
    direction: 'vertical',
  },
  render: DefaultLargeTemplate,
};

export const DefaultSmall: Story = {
  args: {
    items: steps,
    variant: 'small',
    direction: 'horizontal',
  },
  render: DefaultLargeTemplate,
};
