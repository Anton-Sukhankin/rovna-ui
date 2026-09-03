import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useBoolean, useVisibility } from '@rovna-ui/hooks';

import { Alert, Button, Modal, Table, Toggle } from '@rovna-ui/components/primitives';
import { Box } from '@rovna-ui/components/grid';
import { RovnaUI } from '@rovna-ui/components/theme';

import { ColumnsSettings } from './ColumnsSettings';
import { useColumns, useColumnsSettings } from './hooks';
import { ColumnsSettingsProps } from './types';
import { ColumnConfig } from './core';

const meta: Meta<typeof ColumnsSettings> = {
  title: 'Rovna UI/Main/Components/ColumnsSettings',
  component: ColumnsSettings,
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultTemplate = (args: ColumnsSettingsProps) => {
  const [open, setOpen] = useBoolean();
  const [columns, model] = useColumns<ColumnConfig>({
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
    onPresetApply: args.onPresetApply,
    onPresetSave: args.onPresetSave,
    onPresetRemove: args.onPresetRemove,
    onPresetEdit: args.onPresetEdit,
  });
  const properties = useColumnsSettings(model);

  return (
    <Box $display='flex' $flexDirection='column' $gap={16}>
      <Button
        onClick={() => {
          setOpen();
        }}
      >
        Настроить столбцы
      </Button>
      <Table columns={columns} />
      <ColumnsSettings
        {...args}
        {...properties}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};
const DefaultCode = `
const [columns, model] = useColumns<ColumnConfig>([
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
    id: 'name',
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
]);
const properties = useColumnsSettings(model);
<Table columns={columns} />
<ColumnsSettings
  {...properties}
/>
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

const VisibleTemplate = (args: ColumnsSettingsProps) => {
  const [open, setOpen] = useBoolean();
  const [columns, model] = useColumns<ColumnConfig>([
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
  ]);
  const properties = useColumnsSettings(model);

  return (
    <Box $display='flex' $flexDirection='column' $gap={16}>
      <Button
        onClick={() => {
          setOpen();
        }}
      >
        Настроить столбцы
      </Button>
      <Table columns={columns} />
      <ColumnsSettings
        {...args}
        {...properties}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};
const VisibleCode = `
const [columns, model] = useColumns<ColumnConfig>([
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
    id: 'name',
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
]);
const properties = useColumnsSettings(model);
<Table columns={columns} />
<ColumnsSettings
  {...properties}
/>
`;
export const Visible: Story = {
  render: VisibleTemplate,
  parameters: {
    docs: {
      source: {
        code: VisibleCode,
      },
    },
  },
};

const DisabledTemplate = (args: ColumnsSettingsProps) => {
  const [open, setOpen] = useBoolean();
  const [columns, model] = useColumns<ColumnConfig>([
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
  ]);
  const properties = useColumnsSettings(model);

  return (
    <Box $display='flex' $flexDirection='column' $gap={16}>
      <Button
        onClick={() => {
          setOpen();
        }}
      >
        Настроить столбцы
      </Button>
      <Table columns={columns} />
      <ColumnsSettings
        {...args}
        {...properties}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};
const DisabledCode = `
const [columns, model] = useColumns<ColumnConfig>([
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
    id: 'name',
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
]);
const properties = useColumnsSettings(model);
<Table columns={columns} />
<ColumnsSettings
  {...properties}
/>
`;
export const Disabled: Story = {
  args: {},
  render: DisabledTemplate,
  parameters: {
    docs: {
      source: {
        code: DisabledCode,
      },
    },
  },
};

const PinnableTemplate = (args: ColumnsSettingsProps) => {
  const [open, setOpen] = useBoolean();
  const [columns, model] = useColumns<ColumnConfig>([
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
  ]);
  const properties = useColumnsSettings(model);

  return (
    <Box $display='flex' $flexDirection='column' $gap={16}>
      <Button
        onClick={() => {
          setOpen();
        }}
      >
        Настроить столбцы
      </Button>
      <Table columns={columns} />
      <ColumnsSettings
        {...args}
        {...properties}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};
const PinnableCode = `
const [columns, model] = useColumns<ColumnConfig>([
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
    id: 'name',
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
]);
const properties = useColumnsSettings(model);
<Table columns={columns} />
<ColumnsSettings
  {...properties}
/>
`;
export const Pinnable: Story = {
  args: {},
  render: PinnableTemplate,
  parameters: {
    docs: {
      source: {
        code: PinnableCode,
      },
    },
  },
};

const IgnoreTemplate = (args: ColumnsSettingsProps) => {
  const [open, setOpen] = useBoolean();
  const [columns, model] = useColumns<ColumnConfig>({
    ignore: ['number'],
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
  });
  const properties = useColumnsSettings(model);

  return (
    <Box $display='flex' $flexDirection='column' $gap={16}>
      <Button
        onClick={() => {
          setOpen();
        }}
      >
        Настроить столбцы
      </Button>
      <Table columns={columns} scroll={{ x: 1500 }} />
      <ColumnsSettings
        {...args}
        {...properties}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};
const IgnoreCode = `
const [columns, model] = useColumns<ColumnConfig>({
  ignore: ['number'],
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
      id: 'name',
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
});
const properties = useColumnsSettings(model);
<Table columns={columns} scroll={{ x: 1500 }} />
<ColumnsSettings
  {...properties}
/>
`;
export const Ignore: Story = {
  args: {},
  render: IgnoreTemplate,
  parameters: {
    docs: {
      source: {
        code: IgnoreCode,
      },
    },
  },
};

const PinningTemplate = (args: ColumnsSettingsProps) => {
  const [open, setOpen] = useBoolean();
  const [columns, model] = useColumns<ColumnConfig>([
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
  ]);
  const properties = useColumnsSettings(model);

  return (
    <Box $display='flex' $flexDirection='column' $gap={16}>
      <Button
        onClick={() => {
          setOpen();
        }}
      >
        Настроить столбцы
      </Button>
      <Table columns={columns} scroll={{ x: 1500 }} />
      <ColumnsSettings
        {...args}
        {...properties}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};
const PinningCode = `
const [columns, model] = useColumns<ColumnConfig>([
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
    id: 'name',
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
]);
const properties = useColumnsSettings(model);
<Table columns={columns} scroll={{ x: 1500 }} />
<ColumnsSettings
  {...properties}
/>
`;
export const Pinning: Story = {
  args: {},
  render: PinningTemplate,
  parameters: {
    docs: {
      source: {
        code: PinningCode,
      },
    },
  },
};

const ShowPresetsCode = `
const [columns, model] = useColumns<ColumnConfig>([
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
    id: 'name',
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
]);
const properties = useColumnsSettings(model);
<Table columns={columns} />
<ColumnsSettings
  showPresets
  {...properties}
/>
`;
export const ShowPresets: Story = {
  args: {
    showPresets: true,
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
  },
  render: DefaultTemplate,
  parameters: {
    docs: {
      source: {
        code: ShowPresetsCode,
      },
    },
  },
};

const LocalStorageTemplate = (args: ColumnsSettingsProps) => {
  const [open, setOpen] = useBoolean();
  const [columns, model] = useColumns<ColumnConfig>({
    localStorage: 'rovna-ui-columns',
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
  });
  const properties = useColumnsSettings(model);

  return (
    <Box $display='flex' $flexDirection='column' $gap={16}>
      <Button
        onClick={() => {
          setOpen();
        }}
      >
        Настроить столбцы
      </Button>
      <Table columns={columns} scroll={{ x: 1500 }} />
      <ColumnsSettings
        {...args}
        {...properties}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};
const LocalStorageCode = `
const [columns, model] = useColumns<ColumnConfig>({
  localStorage: 'rovna-ui-columns',
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
      id: 'name',
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
});
const properties = useColumnsSettings(model);
<Table columns={columns} />
<ColumnsSettings
  {...properties}
/>
`;
export const LocalStorage: Story = {
  render: LocalStorageTemplate,
  parameters: {
    docs: {
      source: {
        code: LocalStorageCode,
      },
    },
  },
};

const InternationalizationTemplate = (args: ColumnsSettingsProps) => {
  const [open, setOpen] = useBoolean();
  const [columns, model] = useColumns<ColumnConfig>([
    {
      id: 'number',
      label: "Номер",
      title: "Номер",
    },
    {
      id: 'status',
      label: "Статус",
      title: "Статус",
    },
    {
      id: 'type',
      label: "Тип",
      title: "Тип",
    },
    {
      id: "Название",
      label: "Название",
      title: "Название",
    },
    {
      id: 'priority',
      label: "Приоритет",
      title: "Приоритет",
    },
    {
      id: 'description',
      label: "Описание",
      title: "Описание",
    },
  ]);
  const properties = useColumnsSettings(model);

  return (
    <Box $display='flex' $flexDirection='column' $gap={16}>
      <Button
        onClick={() => {
          setOpen();
        }}
      >
        Настройки столбцов
      </Button>
      <Table columns={columns} />
      <ColumnsSettings
        {...args}
        {...properties}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};
const InternationalizationCode = `
const [columns, model] = useColumns<ColumnConfig>([
  {
    id: 'number',
    label: 'Number',
    title: 'Number',
  },
  {
    id: 'status',
    label: 'Status',
    title: 'Status',
  },
  {
    id: 'type',
    label: 'Type',
    title: 'Type',
  },
  {
    id: 'name',
    label: 'Name',
    title: 'Name',
  },
  {
    id: 'priority',
    label: 'Priority',
    title: 'Priority',
  },
  {
    id: 'description',
    label: 'Description',
    title: 'Description',
  },
]);
const properties = useColumnsSettings(model);
<Table columns={columns} />
<ColumnsSettings
  {...properties}
/>
`;
export const Internationalization: Story = {
  args: {},
  decorators: [
    Story => (
      <RovnaUI lang='en'>
        <Story />
      </RovnaUI>
    ),
  ],
  render: InternationalizationTemplate,
  parameters: {
    docs: {
      source: {
        code: InternationalizationCode,
      },
    },
  },
};

const CompositionTemplate = (_args: ColumnsSettingsProps) => {
  const visibility = useVisibility();
  const [columns, model] = useColumns<ColumnConfig>([
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
  ]);

  return (
    <Box $display='flex' $flexDirection='column' $gap={16}>
      <Button onClick={visibility.show}>Настроить столбцы</Button>
      <Table columns={columns} scroll={{ x: 1500 }} />

      <ColumnsSettings.Root columns={model.columns} onColumnDragEnd={model.swap}>
        <Modal
          open={visibility.visible}
          title='Настройка столбцов'
          footer={<ColumnsSettings.ResetButton onClick={model.reset} />}
          onCancel={visibility.hide}
        >
          <Alert
            mb='16px'
            message='Вы можете скрывать столбцы и менять их последовательность. Для этого в списке ниже перетащите название столбца вверх или вниз.'
          />
          <ColumnsSettings.List columns={model.columns}>
            {model.columns.map(column => (
              <ColumnsSettings.ColumnsSetting.Root key={column.id} column={column}>
                <ColumnsSettings.ColumnsSetting.DragHandle />
                <ColumnsSettings.ColumnsSetting.Pin
                  pinned={!!column?.fixed}
                  onChange={position => model.pin(position, column)}
                />
                <Box $width='100%'>{column.label}</Box>
                <Toggle
                  checked={column.visible}
                  disabled={column.disabled}
                  onChange={v => model.display(v, column)}
                />
              </ColumnsSettings.ColumnsSetting.Root>
            ))}
          </ColumnsSettings.List>
        </Modal>
      </ColumnsSettings.Root>
    </Box>
  );
};
const CompositionCode = `
import { Box } from '@rovna-ui/components/grid';
import { Toggle, Modal, Alert } from '@rovna-ui/components/primitives';
import { ColumnsSettings, useColumnsSettings } from '@rovna-ui/components/components';
import { useVisibility } from '@rovna-ui/components/hooks';

const visibility = useVisibility();
const [columns, model] = useColumns<ColumnConfig>([
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
    id: 'name',
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
]);

<Box $display='flex' $flexDirection='column' $gap={16}>
  <Button
    onClick={visibility.show}
  >
    Настроить столбцы
  </Button>

  <Table columns={columns} scroll={{ x: 1500 }} />

  <ColumnsSettings.Root
    columns={model.columns}
    onColumnDragEnd={model.swap}
  >
    <Modal
      open={visibility.visible}
      title='Настройка столбцов'
      footer={<ColumnsSettings.ResetButton onClick={model.reset} />}
      onClose={visibility.hide}
    >
      <Alert
        mb='16px'
        message='Вы можете скрывать столбцы и менять их последовательность. Для этого в списке ниже перетащите название столбца вверх или вниз.'
      />
      <ColumnsSettings.List columns={model.columns}>
        {model.columns.map(column => (
          <ColumnsSettings.ColumnsSetting.Root key={column.id} column={column}>
            <ColumnsSettings.ColumnsSetting.DragHandle disabled={!column.draggable} />
            <ColumnsSettings.ColumnsSetting.Pin
              disabled={!column.pinnable}
              pinned={!!column?.fixed}
              onChange={(position) => model.pin(position, column)}
            />
            <Box $width='100%'>{column.label}</Box>
            <Toggle
              checked={column.visible}
              disabled={column.disabled}
              onChange={v => model.display(v, column)}
            />
          </ColumnsSettings.ColumnsSetting.Root>
        ))}
      </ColumnsSettings.List>
    </Modal>
  </ColumnsSettings.Root>
</Box>
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
