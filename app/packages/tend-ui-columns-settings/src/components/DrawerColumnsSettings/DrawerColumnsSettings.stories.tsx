import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { useBoolean } from '@rovna-ui/hooks';
import { Button, Table } from '@rovna-ui/components/primitives';
import { Box } from '@rovna-ui/components/grid';
import { argTypes } from '@rovna-ui/tools';

import {
  UseColumnsParameters,
  useColumns,
} from '@rovna-internal/columns-settings/hooks/useColumns';
import { ColumnConfig } from '@rovna-internal/columns-settings/core/interfaces';

import docs from './docs.json';
import { DrawerColumnsSettings } from './DrawerColumnsSettings';
import { DrawerColumnsSettingsProps } from './types';

type TemplateProps = DrawerColumnsSettingsProps & UseColumnsParameters;

const meta: Meta<TemplateProps> = {
  title: 'Rovna UI/Columns Settings/DrawerColumnsSettings',
  component: DrawerColumnsSettings,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (props: TemplateProps) => {
  const [open, setOpen] = useBoolean();
  const settings = useColumns<ColumnConfig>(props);

  return (
    <Box $display='flex' $flexDirection='column' $gap={16}>
      <Button
        onClick={() => {
          setOpen();
        }}
      >
        Настроить столбцы
      </Button>
      <Table columns={settings.getAntdTableColumns()} />
      <DrawerColumnsSettings
        {...props}
        settings={settings}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onApply={() => {
          setOpen(false);
        }}
        onResetAll={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Настроить столбцы' }));
    const dragHandles = await page.findAllByTestId(
      'rovna-ui-columns-settings-column-setting-drag',
    );
    dragHandles[0].focus();
    await userEvent.keyboard(' ');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard(' ');
    await userEvent.click(page.getByRole('button', { name: 'Применить' }));
    await waitFor(() => expect(args.onColumnsChange).toHaveBeenCalledTimes(1));
  },
  args: {
    onColumnsChange: fn(),
    defaultColumns: [
      {
        id: 'number',
        label: 'Номер',
        title: 'Номер',
      },
      {
        id: 'status',
        label: 'Статус',
        title: 'Статус',
      },
      {
        id: 'type',
        label: 'Тип',
        title: 'Тип',
      },
      {
        id: "Название",
        label: 'Название',
        title: 'Название',
      },
      {
        id: 'priority',
        label: 'Приоритет',
        title: 'Приоритет',
      },
      {
        id: 'description',
        label: 'Описание',
        title: 'Описание',
      },
    ],
  },
  render: Template,
};
export const Controlled: Story = {
  args: {
    onColumnsChange: columns => {
      console.log('[Controlled][onColumnsChange]', columns);
    },
    columns: [
      {
        id: 'number',
        label: 'Номер',
        title: 'Номер',
      },
      {
        id: 'status',
        label: 'Статус',
        title: 'Статус',
      },
      {
        id: 'type',
        label: 'Тип',
        title: 'Тип',
      },
      {
        id: "Название",
        label: 'Название',
        title: 'Название',
      },
      {
        id: 'priority',
        label: 'Приоритет',
        title: 'Приоритет',
      },
      {
        id: 'description',
        label: 'Описание',
        title: 'Описание',
      },
    ],
  },
  render: props => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [columns, setColumns] = React.useState(props.columns);
    const [open, setOpen] = useBoolean();
    const settings = useColumns<ColumnConfig>({
      defaultColumns: [
        {
          id: 'number',
          label: 'Номер',
          title: 'Номер',
          visible: false,
        },
        {
          id: 'status',
          label: 'Статус',
          title: 'Статус',
          visible: false,
        },
        {
          id: 'type',
          label: 'Тип',
          title: 'Тип',
        },
        {
          id: "Название",
          label: 'Название',
          title: 'Название',
        },
        {
          id: 'priority',
          label: 'Приоритет',
          title: 'Приоритет',
        },
        {
          id: 'description',
          label: 'Описание',
          title: 'Описание',
        },
      ],
      columns,
      onColumnsChange: setColumns,
    });
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Box $display='flex' $flexDirection='column' $gap={16}>
        <Button
          onClick={() => {
            setOpen();
          }}
        >
          Настроить столбцы
        </Button>
        <Table columns={settings.getAntdTableColumns()} />
        <DrawerColumnsSettings
          {...props}
          settings={settings}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          onApply={() => {
            setOpen(false);
          }}
          onResetAll={() => {
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};
export const Visible: Story = {
  args: {
    onColumnsChange: columns => {
      console.log('[Visible][onColumnsChange]', columns);
    },
    defaultColumns: [
      {
        id: 'number',
        label: 'Номер',
        title: 'Номер',
        visible: false,
      },
      {
        id: 'status',
        label: 'Статус',
        title: 'Статус',
      },
      {
        id: 'type',
        label: 'Тип',
        title: 'Тип',
      },
      {
        id: "Название",
        label: 'Название',
        title: 'Название',
        visible: false,
      },
      {
        id: 'priority',
        label: 'Приоритет',
        title: 'Приоритет',
      },
      {
        id: 'description',
        label: 'Описание',
        title: 'Описание',
      },
    ],
  },
  render: Template,
};
export const Disabled: Story = {
  args: {
    onColumnsChange: columns => {
      console.log('[Disabled][onColumnsChange]', columns);
    },
    defaultColumns: [
      {
        id: 'number',
        label: 'Номер',
        title: 'Номер',
        disabled: true,
      },
      {
        id: 'status',
        label: 'Статус',
        title: 'Статус',
      },
      {
        id: 'type',
        label: 'Тип',
        title: 'Тип',
      },
      {
        id: "Название",
        label: 'Название',
        title: 'Название',
        disabled: true,
      },
      {
        id: 'priority',
        label: 'Приоритет',
        title: 'Приоритет',
      },
      {
        id: 'description',
        label: 'Описание',
        title: 'Описание',
      },
    ],
  },
  render: Template,
};
export const Pinnable: Story = {
  args: {
    onColumnsChange: columns => {
      console.log('[Pinnable][onColumnsChange]', columns);
    },
    defaultColumns: [
      {
        id: 'number',
        label: 'Номер',
        title: 'Номер',
        pinnable: false,
      },
      {
        id: 'status',
        label: 'Статус',
        title: 'Статус',
      },
      {
        id: 'type',
        label: 'Тип',
        title: 'Тип',
      },
      {
        id: "Название",
        label: 'Название',
        title: 'Название',
        pinnable: false,
      },
      {
        id: 'priority',
        label: 'Приоритет',
        title: 'Приоритет',
      },
      {
        id: 'description',
        label: 'Описание',
        title: 'Описание',
      },
    ],
  },
  render: Template,
};
export const Ignore: Story = {
  args: {
    onColumnsChange: columns => {
      console.log('[Ignore][onColumnsChange]', columns);
    },
    ignore: ['number'],
    defaultColumns: [
      {
        id: 'number',
        label: 'Номер',
        title: 'Номер',
      },
      {
        id: 'status',
        label: 'Статус',
        title: 'Статус',
      },
      {
        id: 'type',
        label: 'Тип',
        title: 'Тип',
      },
      {
        id: "Название",
        label: 'Название',
        title: 'Название',
      },
      {
        id: 'priority',
        label: 'Приоритет',
        title: 'Приоритет',
      },
      {
        id: 'description',
        label: 'Описание',
        title: 'Описание',
      },
    ],
  },
  render: Template,
};
export const Pinning: Story = {
  args: {
    onColumnsChange: columns => {
      console.log('[Pinning][onColumnsChange]', columns);
    },
    defaultColumns: [
      {
        id: 'number',
        label: 'Номер',
        title: 'Номер',
      },
      {
        id: 'status',
        label: 'Статус',
        title: 'Статус',
      },
      {
        id: 'type',
        label: 'Тип',
        title: 'Тип',
      },
      {
        id: "Название",
        label: 'Название',
        title: 'Название',
      },
      {
        id: 'priority',
        label: 'Приоритет',
        title: 'Приоритет',
      },
      {
        id: 'description',
        label: 'Описание',
        title: 'Описание',
      },
    ],
  },
  render: Template,
};
export const ShowPresets: Story = {
  args: {
    onColumnsChange: columns => {
      console.log('[ShowPresets][onColumnsChange]', columns);
    },
    showPresets: true,
    defaultPresets: [
      {
        id: '1',
        label: 'Пресет 1',
        value: [
          {
            id: 'number',
            fixed: 'left',
          },
          {
            id: 'status',
            visible: false,
          },
          {
            id: 'type',
            visible: false,
          },
          {
            id: "Название",
          },
          {
            id: 'priority',
          },
          {
            id: 'description',
            visible: false,
          },
        ],
      },
      {
        id: '2',
        label: 'Пресет 2',
        value: [
          {
            id: 'number',
            fixed: 'left',
          },
          {
            id: 'status',
            fixed: 'left',
          },
          {
            id: 'type',
          },
          {
            id: "Название",
          },
          {
            id: 'priority',
          },
          {
            id: 'description',
          },
        ],
      },
    ],
    onPresetSave: payload => {
      console.log('[ShowPresets][onPresetSave]', payload);
    },
    onPresetEdit: payload => {
      console.log('[ShowPresets][onPresetEdit]', payload);
    },
    onPresetRemove: payload => {
      console.log('[ShowPresets][onPresetRemove]', payload);
    },
    onPresetApply: payload => {
      console.log('[ShowPresets][onPresetApply]', payload);
    },
    defaultColumns: [
      {
        id: 'number',
        label: 'Номер',
        title: 'Номер',
      },
      {
        id: 'status',
        label: 'Статус',
        title: 'Статус',
      },
      {
        id: 'type',
        label: 'Тип',
        title: 'Тип',
      },
      {
        id: "Название",
        label: 'Название',
        title: 'Название',
      },
      {
        id: 'priority',
        label: 'Приоритет',
        title: 'Приоритет',
      },
      {
        id: 'description',
        label: 'Описание',
        title: 'Описание',
      },
    ],
  },
  render: Template,
};
export const LocalStorage: Story = {
  args: {
    onColumnsChange: columns => {
      console.log('[LocalStorage][onColumnsChange]', columns);
    },
    localStorage: 'rovna-ui-columns',
    defaultColumns: [
      {
        id: 'number',
        label: 'Номер',
        title: 'Номер',
      },
      {
        id: 'status',
        label: 'Статус',
        title: 'Статус',
      },
      {
        id: 'type',
        label: 'Тип',
        title: 'Тип',
      },
      {
        id: "Название",
        label: 'Название',
        title: 'Название',
      },
      {
        id: 'priority',
        label: 'Приоритет',
        title: 'Приоритет',
      },
      {
        id: 'description',
        label: 'Описание',
        title: 'Описание',
      },
    ],
  },
  render: Template,
};
export const Composition: Story = {
  args: {
    defaultColumns: [
      {
        id: 'number',
        label: 'Номер',
        title: 'Номер',
      },
      {
        id: 'status',
        label: 'Статус',
        title: 'Статус',
      },
      {
        id: 'type',
        label: 'Тип',
        title: 'Тип',
      },
      {
        id: "Название",
        label: 'Название',
        title: 'Название',
      },
      {
        id: 'priority',
        label: 'Приоритет',
        title: 'Приоритет',
      },
      {
        id: 'description',
        label: 'Описание',
        title: 'Описание',
      },
    ],
  },
  render: Template,
};
