import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { argTypes } from '@rovna-ui/tools';

import { Box } from '@rovna-internal/components/grid/Box';
import { Button } from '@rovna-internal/components/primitives/Button';
import { Toggle } from '@rovna-internal/components/primitives/Toggle';

import { Actions } from './Actions';
import { ActionsProps } from './types';
import docs from './docs.json';

const meta: Meta<typeof Actions> = {
  title: 'Rovna UI/Main/Primitives/Actions',
  component: Actions,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultTemplate = (args: ActionsProps) => {
  const [count, setCount] = React.useState(0);

  return (
    <Box $display='flex' $alignItems='center' $gap={12}>
      <Button
        onClick={() => {
          setCount(prev => prev + 1);
        }}
      >
        +1
      </Button>
      <Button
        onClick={() => {
          setCount(0);
        }}
      >
        Сбросить
      </Button>
      <Actions {...args} counter={count} />
    </Box>
  );
};
export const Default: Story = {
  render: DefaultTemplate,
};

const VisibleTemplate = (_args: ActionsProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Box $display='flex' $alignItems='center' $gap={12}>
      <Toggle
        onChange={v => {
          setVisible(v);
        }}
      >
        {visible ? 'Показано' : 'Скрыто'}
      </Toggle>
      <Actions visible={visible} counter={100} />
    </Box>
  );
};
export const Visible: Story = {
  render: VisibleTemplate,
};

const OffsetTemplate = (args: ActionsProps) => {
  const [count, setCount] = React.useState(0);

  return (
    <Box $display='flex' $alignItems='center' $gap={12}>
      <Button
        onClick={() => {
          setCount(prev => prev + 1);
        }}
      >
        +1
      </Button>
      <Button
        onClick={() => {
          setCount(0);
        }}
      >
        Сбросить
      </Button>
      <Actions {...args} counter={count} offset={200} />
    </Box>
  );
};
export const Offset: Story = {
  render: OffsetTemplate,
};

const CustomizationTemplate = (_args: ActionsProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Box $display='flex' $alignItems='center' $gap={12}>
      <Toggle
        onChange={v => {
          setVisible(v);
        }}
      >
        {visible ? 'Показано' : 'Скрыто'}
      </Toggle>
      <Actions
        visible={visible}
        counter={{ inner: 5628, preset: 'red', max: 5000 }}
        offset={200}
      />
    </Box>
  );
};
export const Customization: Story = {
  render: CustomizationTemplate,
};
