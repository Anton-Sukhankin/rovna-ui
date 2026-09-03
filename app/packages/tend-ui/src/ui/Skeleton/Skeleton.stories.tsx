import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Input } from '@rovna-internal/components/primitives';
import { Box } from '@rovna-internal/components/grid';

import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Rovna UI/Main/UI/Skeleton',
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

const ActiveCode = `
<Skeleton skeleton={true}>
  <Input />
</Skeleton>
`;
const ActiveTemplate = (_args: unknown) => {
  const [skeleton, setSkeleton] = React.useState(false);

  return (
    <Box $display='flex' $flexDirection='column' $gap={16}>
      <Button
        onClick={() => {
          setSkeleton(true);
        }}
      >
        Скрыть
      </Button>
      <Button
        onClick={() => {
          setSkeleton(false);
        }}
      >
        Показать
      </Button>
      <Box>
        <Skeleton skeleton={skeleton} height={32}>
          <Input placeholder='Введите текст' />
        </Skeleton>
      </Box>
    </Box>
  );
};
export const Active: Story = {
  parameters: {
    docs: {
      source: {
        code: ActiveCode,
      },
    },
  },
  args: {},
  render: ActiveTemplate,
};

export const Width: Story = {
  args: {
    width: 300,
  },
};

export const Height: Story = {
  args: {
    height: 50,
  },
};

export const BorderRadius: Story = {
  args: {
    width: 30,
    height: 30,
    borderRadius: '50%',
  },
};

export const BackgroundColor: Story = {
  args: {
    backgroundColor: 'red',
  },
};

export const List: Story = {
  args: {
    children: "Пример текста",
  },
  render: _args => (
    <>
      <Skeleton mb={8} />
      <Skeleton mb={8} />
      <Skeleton mb={8} />
      <Skeleton mb={8} />
    </>
  ),
};
