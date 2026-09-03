import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@rovna-ui/primitives';
import React from 'react';

import { DrawerProfile } from './DrawerProfile';

const meta: Meta<typeof DrawerProfile> = {
  title: 'Rovna UI/Header/core/DrawerProfile',
  component: DrawerProfile,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Квокка Квокковна',
    description: 'user@example.com',
  },
  render: args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [open, setOpen] = React.useState(false);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <>
        <Button onClick={() => setOpen(true)}>Открыть</Button>
        <DrawerProfile {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};
