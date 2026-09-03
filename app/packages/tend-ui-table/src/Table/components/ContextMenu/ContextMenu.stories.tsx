import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColumnConfig, FilterConfig } from '@rovna-ui/components/components';
import { Button } from '@rovna-ui/components/primitives';

import { Root, SorterConfig } from '@rovna-internal/table/Table';

import { ContextMenu } from './ContextMenu';

const meta: Meta<typeof ContextMenu> = {
  title: 'Rovna UI/Table/ContextMenu',
  component: ContextMenu,
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultTemplate = () => {
  const column: ColumnConfig = {
    id: 'contractor',
    title: "Столбец",
    pinnable: true,
  };

  const filter: FilterConfig = {
    id: 'contractor',
    name: 'contractor',
    label: 'Подрядчик',
    component: {
      component: 'input',
    },
  };

  const sorter: SorterConfig = {
    id: 'contractor',
    name: 'contractor',
    label: 'Подрядчик',
    variant: 'default',
  };

  return (
    <Root columns={[column]} filters={[filter]} sorters={[sorter]}>
      <ContextMenu id='contractor'>
        <Button>Открыть меню столбца</Button>
      </ContextMenu>
    </Root>
  );
};
const DefaultCode = `
const column: ColumnConfig = {
  id: 'contractor',
  title: 'Column',
};
const filter: FilterConfig = {
  id: 'contractor',
  name: 'contractor',
  label: 'Contractor',
  component: {
    component: 'input',
  },
};
const sorter: SorterConfig = {
  id: 'contractor',
  name: 'contractor',
  label: 'Подрядчик',
  variant: 'default',
};

<Root columns={[column]} filters={[filter]}>
  <ContextMenu id="contractor">
    Кликни на меня
  </ContextMenu>
</Root>
`;
export const Default: Story = {
  render: DefaultTemplate,
  parameters: {
    docs: {
      source: {
        code: DefaultCode,
      },
    },
  },
};

const CustomizationTemplate = () => {
  const column: ColumnConfig = {
    id: 'contractor',
    title: "Столбец",
    pinnable: true,
  };

  const filter: FilterConfig = {
    id: 'contractor',
    name: 'contractor',
    label: "Подрядчик",
    component: {
      component: 'input',
    },
  };
  const sorter: SorterConfig = {
    id: 'contractor',
    name: 'contractor',
    label: 'Подрядчик',
    variant: 'novelty',
  };

  return (
    <Root columns={[column]} filters={[filter]} sorters={[sorter]}>
      <ContextMenu id='contractor'>Нажмите</ContextMenu>
    </Root>
  );
};
const CustomizationCode = `
const column: ColumnConfig = {
  id: 'contractor',
  title: 'Column',
};
const filter: FilterConfig = {
  id: 'contractor',
  name: 'contractor',
  label: 'Contractor',
  component: {
    component: 'input',
  },
};
const sorter: SorterConfig = {
  id: 'contractor',
  name: 'contractor',
  label: 'Подрядчик',
  variant: 'novelty',
};


<Root form={table.form} columns={[column]} filters={[filter]} sorters={[sorter]}>
  <ContextMenu id='contractor'>
    Click me
  </ContextMenu>
</Root>
`;
export const Customization: Story = {
  render: CustomizationTemplate,
  parameters: {
    docs: {
      source: {
        code: CustomizationCode,
      },
    },
  },
};

const CompositionTemplate = () => {
  const column: ColumnConfig = {
    id: 'contractor',
    title: "Столбец",
    pinnable: true,
  };

  const filter: FilterConfig = {
    id: 'contractor',
    name: 'contractor',
    label: "Подрядчик",
    component: {
      component: 'input',
    },
  };
  const sorter: SorterConfig = {
    id: 'contractor',
    name: 'contractor',
    label: 'Подрядчик',
    variant: 'novelty',
  };

  return (
    <Root columns={[column]} filters={[filter]} sorters={[sorter]}>
      <ContextMenu id='contractor' content={<ContextMenu.Filter />}>
        Нажмите
      </ContextMenu>
    </Root>
  );
};
const CompositionCode = `
const column: ColumnConfig = {
  id: 'contractor',
  title: 'Column',
};
const filter: FilterConfig = {
  id: 'contractor',
  name: 'contractor',
  label: 'Contractor',
  component: {
    component: 'input',
  },
};


<Root form={table.form} columns={[column]} filters={[filter]}>
  <ContextMenu id='contractor' content={<ContextMenu.Filter />}>
    Click me
  </ContextMenu>
</Root>
`;
export const Composition: Story = {
  render: CompositionTemplate,
  parameters: {
    docs: {
      source: {
        code: CompositionCode,
      },
    },
  },
};
