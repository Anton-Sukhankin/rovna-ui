import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Settings } from '@rovna-ui/icons';
import { useBoolean } from '@rovna-ui/hooks';
import { expect, fn, userEvent, within } from 'storybook/test';
import { argTypes } from '@rovna-ui/tools';

import { ToggleButton } from './ToggleButton';
import { ToggleButtonProps } from './types';
import docs from './docs.json';

const meta: Meta<typeof ToggleButton> = {
  title: 'Rovna UI/Primitives/ToggleButton',
  component: ToggleButton,
  args: {
    'aria-label': 'Настройки',
  },
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Play: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByTestId('rovna-ui-toggle-button');
    await userEvent.click(btn);
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
  },
  args: {
    children: <Settings />,
    onSelectedChange: fn(),
  },
};

export const Default: Story = {
  args: {
    children: <Settings />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <Settings />,
  },
};

const SelectableCode = `
<ToggleButton selectable={false}>
  <Settings />
</ToggleButton>
`;
export const Selectable: Story = {
  parameters: {
    docs: {
      source: {
        code: SelectableCode,
      },
    },
  },
  args: {
    selectable: false,
    children: <Settings />,
  },
};

const ControlledTemplate = (args: ToggleButtonProps) => {
  const [visible, setVisible] = useBoolean();

  return <ToggleButton {...args} selected={visible} onSelectedChange={setVisible} />;
};
const ControlledCode = `
import { useBoolean } from '@rovna-ui/components/hooks';
const [selected, setVisible] = useBoolean();

<ToggleButton selected={selected} onSelectedChange={setVisible}>
  <Settings />
</ToggleButton>
`;
export const Controlled: Story = {
  args: {
    children: <Settings />,
  },
  render: ControlledTemplate,
  parameters: {
    docs: {
      source: {
        code: ControlledCode,
      },
    },
  },
};
