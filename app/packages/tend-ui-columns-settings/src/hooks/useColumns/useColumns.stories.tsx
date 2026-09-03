import type { Meta, StoryObj } from '@storybook/react-vite';
import { argTypes } from '@rovna-ui/tools';

import { UseColumnsParameters } from '@rovna-internal/columns-settings/hooks/useColumns';

import { Template } from './Template';
import docs from './docs.json';

const meta: Meta<UseColumnsParameters> = {
  title: 'Rovna UI/Columns Settings/useColumns',
  component: Template,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultColumns: [] },
  render: Template,
};

export const Controlled: Story = {
  args: { columns: [], defaultColumns: [] },
  render: Template,
};
