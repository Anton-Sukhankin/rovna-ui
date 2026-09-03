/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { DrawerColumnsSettings, useColumns } from '@rovna-ui/columns-settings';
import { GenericObject } from '@rovna-ui/types';
import dayjs from 'dayjs';
import { Button } from '@rovna-ui/primitives';
import { MoreHoriz } from '@rovna-ui/icons';

import { Table } from '@rovna-ui/table';

const columns: Table.ColumnType<GenericObject>[] = [
  {
    disabled: true,
    key: 'number',
    id: 'number',
    label: 'Number',
    title: 'Number',
    dataIndex: 'number',
    onHeaderCell: () => ({
      id: 'number',
    }),
    render: v => `№ ${v}`,
  },
  {
    key: 'firstName',
    id: 'firstName',
    label: 'Name',
    title: 'Name',
    dataIndex: 'firstName',
    onHeaderCell: () => ({
      id: 'firstName',
    }),
  },

  {
    key: 'sex',
    id: 'sex',
    label: 'Sex',
    title: 'Sex',
    dataIndex: 'sex',
    onHeaderCell: () => ({
      id: 'sex',
    }),
  },
  {
    key: 'bio',
    id: 'bio',
    label: 'Bio',
    title: 'Bio',
    dataIndex: 'bio',
    onHeaderCell: () => ({
      id: 'bio',
    }),
  },
  {
    key: 'job',
    id: 'job',
    label: 'Job',
    title: 'Job',
    dataIndex: 'job',
    onHeaderCell: () => ({
      id: 'job',
    }),
  },
  {
    pinnable: false,
    key: 'birthdate',
    id: 'birthdate',
    label: 'Birth Date',
    title: 'Birth dat',
    dataIndex: 'birthdate',
    onHeaderCell: () => ({
      id: 'birthdate',
    }),
    render: v => dayjs(v).format('DD-MM-YYYY'),
  },
  {
    key: 'animal',
    id: 'animal',
    label: 'Animal',
    title: 'Animal',
    dataIndex: 'animal',
    onHeaderCell: () => ({
      id: 'animal',
    }),
  },
  {
    key: 'admin',
    id: 'admin',
    label: 'Admin',
    title: 'Admin',
    dataIndex: 'admin',
    render: value => value.toString(),
    onHeaderCell: () => ({
      id: 'admin',
    }),
  },
  {
    width: 50,
    key: 'actions',
    id: 'actions',
    title: '',
    dataIndex: 'actions',
    fixed: 'right',
    render: () => <Button before={<MoreHoriz />} variant='ghost' />,
  },
];

const filters: Table.FilterConfig[] = [
  {
    key: 'f-number',
    id: 'number',
    name: 'number',
    label: 'Номер',
    component: { component: 'input', placeholder: 'Введите номер' },
  },
  {
    key: 'f-firstName',
    id: 'firstName',
    name: 'firstName',
    label: 'Имя',
    component: { component: 'input', placeholder: 'Введите имя' },
  },
  {
    key: 'f-sex',
    id: 'sex',
    name: 'sex',
    label: 'Пол',
    component: {
      component: 'radio-group',
      options: [
        { value: 'male', label: 'Мужчина' },
        { value: 'female', label: 'Женщина' },
      ],
    },
  },
  {
    key: 'f-job',
    id: 'job',
    name: 'job',
    label: 'Работа',
    component: {
      component: 'async-select',
      placeholder: 'Выберите род деятельности',
      api: {
        cache: {
          key: 'jobs',
        },
        url: '/api/jobs/',
      },
    },
  },
  {
    key: 'f-birthdate',
    id: 'birthdate',
    name: 'birthdate',
    label: 'День рождения',
    component: {
      component: 'date-picker',
    },
  },
  {
    key: 'f-animal',
    id: 'animal',
    name: 'animal',
    label: 'Животное',
    component: {
      component: 'checkbox-group',
      options: [],
    },
  },
  {
    key: 'f-admin',
    id: 'admin',
    name: 'admin',
    label: 'Админ',
    component: {
      component: 'toggle',
      children: 'Админ',
    },
  },
];

const sorters: Table.SorterConfig[] = [
  {
    key: 's-firstName',
    id: 'firstName',
    name: 'firstName',
  },
  {
    key: 's-job',
    id: 'job',
    name: 'job',
  },
  {
    key: 's-birthdate',
    id: 'birthdate',
    name: 'birthdate',
    variant: 'novelty',
  },
];

type TableFormValues = {
  contractor: string;
  provider: string;
};

export const Page = () => {
  const settings = useColumns({ defaultColumns: columns });
  const rowClassName = Table.useRowHighlighter<GenericObject>({
    onError: record => record.sex === 'male',
    onSuccess: record => record.animal === 'dog',
  });

  const components = React.useMemo(
    () => ({
      header: {
        cell: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
          <Table.ContextMenu id={props.id}>
            <Table.HeaderCell {...props} />
          </Table.ContextMenu>
        ),
      },
    }),
    [],
  );

  return (
    <Table.Root<TableFormValues>
      settings={settings}
      filters={filters}
      sorters={sorters}
      onFilterValuesChange={() => {
        // вызывается при изменении фильтров
      }}
      onSorterValuesChange={() => {
        // вызывается при изменении сортировки
      }}
    >
      <Table.Header>
        <Table.ControlPanel
          filtersButtonProps={{
            onClick: () => {
              // логика при клике
            },
          }}
          settingsButtonProps={{
            onClick: () => {
              // логика при клике
            },
          }}
        />
        <Table.Search />
      </Table.Header>
      <Table.Table
        columns={settings.getAntdTableColumns()}
        components={components}
        scroll={{ x: 1300 }}
        rowClassName={rowClassName}
      />
      <Table.Filters
        open={true}
        onClose={() => {
          // логика при закрытии
        }}
      />
      <DrawerColumnsSettings
        settings={settings}
        open={true}
        onClose={() => {
          // логика при закрытии
        }}
      />
    </Table.Root>
  );
};
