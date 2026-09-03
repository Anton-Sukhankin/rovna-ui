import React from 'react';
import { faker } from '@faker-js/faker';
import { uniq, uniqBy } from 'lodash';
import dayjs from 'dayjs';

import { GenericObject } from '@rovna-internal/components/types/GenericObject';
import { ApiFunctionPayload, useVisibility } from '@rovna-internal/components/hooks';

import { Table } from '../packages/tend-ui-table/src';

const composeEntity = () => {
  const key = faker.string.uuid();

  return {
    key: faker.string.uuid(),
    number: key,
    firstName: faker.person.firstName(),
    sex: faker.person.sexType(),
    bio: faker.person.jobTitle(),
    job: faker.person.jobTitle(),
    birthdate: faker.date.birthdate(),
    animal: faker.animal.type(),
    admin: faker.datatype.boolean(),
  };
};

type TableRecord = ReturnType<typeof composeEntity>;
const dataSource = Array.from({ length: 50 }).map(composeEntity);

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
];
const columns: Table.ColumnType<TableRecord>[] = [
  {
    disabled: true,
    key: 'number',
    id: 'keker',
    label: 'Номер',
    title: <Table.CellTitle id='number'>Номер</Table.CellTitle>,
    dataIndex: 'number',
    onHeaderCell: () => ({
      id: 'number',
    }),
    render: v => `№ ${v}`,
    width: 400,
  },
  {
    key: 'firstName',
    id: 'firstName',
    label: 'Имя',
    title: <Table.CellTitle id='firstName'>Имя</Table.CellTitle>,
    dataIndex: 'firstName',
    onHeaderCell: () => ({
      id: 'firstName',
    }),
  },

  {
    key: 'sex',
    id: 'sex',
    label: 'Пол',
    title: <Table.CellTitle id='sex'>Пол</Table.CellTitle>,
    dataIndex: 'sex',
    onHeaderCell: () => ({
      id: 'sex',
    }),
  },
  {
    key: 'bio',
    id: 'bio',
    label: 'Биография',
    title: <Table.CellTitle id='bio'>Биография</Table.CellTitle>,
    dataIndex: 'bio',
    onHeaderCell: () => ({
      id: 'bio',
    }),
  },
  {
    key: 'job',
    id: 'job',
    label: 'Работа',
    title: <Table.CellTitle id='job'>Работа</Table.CellTitle>,
    dataIndex: 'job',
    onHeaderCell: () => ({
      id: 'job',
    }),
  },
  {
    pinnable: false,
    key: 'birthdate',
    id: 'birthdate',
    label: 'День рождения',
    title: <Table.CellTitle id='birthdate'>День рождения</Table.CellTitle>,
    dataIndex: 'birthdate',
    onHeaderCell: () => ({
      id: 'birthdate',
    }),
    render: v => {
      return dayjs(v).format('DD-MM-YYYY');
    },
  },
  {
    key: 'animal',
    id: 'animal',
    label: 'Животное',
    title: <Table.CellTitle id='animal'>Животное</Table.CellTitle>,
    dataIndex: 'animal',
    onHeaderCell: () => ({
      id: 'animal',
    }),
  },
  {
    key: 'admin',
    id: 'admin',
    label: 'Админ',
    title: <Table.CellTitle id='admin'>Админ</Table.CellTitle>,
    dataIndex: 'admin',
    render: value => value.toString(),
    onHeaderCell: () => ({
      id: 'admin',
    }),
  },
];
const filters: Table.FilterConfig[] = [
  {
    key: 'f-number',
    id: 'number',
    name: 'number',
    label: 'Номер',
    component: {
      component: 'checkbox-group-search',
      options: dataSource.map(data => ({ label: data.number, value: data.number })),
    },
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
    requires: ['firstName', 'number'],
    component: {
      component: 'async-checkbox',
      placeholder: 'Выберите род деятельности',
      api: {
        fn: (payload?: ApiFunctionPayload<{ contractor: number }>) => {
          console.log('Request', payload);

          return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                results: uniqBy(
                  dataSource.map(data => ({ id: data.job, name: data.job })),
                  'id',
                ),
              });
            }, 2000);
          });
        },
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
      options: uniq(dataSource.map(data => data.animal)),
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

export const TablePage = () => {
  const [data] = React.useState(dataSource);
  const [appliedSorters, setAppliedSorters] = React.useState<GenericObject>({});
  const [appliedFilters, setAppliedFilters] = React.useState<GenericObject>({});

  const [tableColumns, model] = Table.useColumns({
    localStorage: 'hello world',
    columns,
  });
  const columnsSettingsProperties = Table.useColumnsSettings(model);

  const filtersVisibility = useVisibility();
  const columnsSettingsVisibility = useVisibility();

  const components = React.useMemo(
    () => ({
      header: {
        cell: (props: React.HTMLAttributes<HTMLTableCellElement>) => {
          return (
            <Table.ContextMenu id={props.id}>
              <Table.Th {...props} />
            </Table.ContextMenu>
          );
        },
      },
    }),
    [],
  );

  const filteredDataSource = data
    .filter(item => {
      const filtering = Object.keys(appliedFilters);
      if (!filtering.length) return true;

      const result = filtering.reduce<boolean[]>((conditions, key) => {
        switch (key) {
          case 'number': {
            const value = appliedFilters[key];

            if (!value) return conditions;
            conditions.push(item.number.includes(value));

            return conditions;
          }
          case 'firstName': {
            const value = appliedFilters[key];

            if (!value) return conditions;
            conditions.push(item.firstName.includes(value));

            return conditions;
          }
          case 'sex': {
            const value = appliedFilters[key];

            if (!value) return conditions;
            conditions.push(item.sex === value);

            return conditions;
          }
          case 'job': {
            const value = appliedFilters[key];

            if (!value) return conditions;
            conditions.push(item.job === value);

            return conditions;
          }
          case 'birthdate': {
            const value = appliedFilters[key];

            if (!value) return conditions;

            const current = dayjs(item.birthdate).format('DD-MM-YYYY');
            const selected = dayjs(value).format('DD-MM-YYYY');
            conditions.push(current === selected);

            return conditions;
          }
          case 'animal': {
            const value = appliedFilters[key];

            if (!value) return conditions;
            conditions.push(value.includes(item.animal));

            return conditions;
          }
          case 'admin': {
            const value = appliedFilters[key];

            if (!value) return conditions;
            conditions.push(item.admin === value);

            return conditions;
          }

          default:
            return conditions;
        }
      }, []);

      return result.every(Boolean);
    })
    .sort((a, b) => {
      const sorters = Object.keys(appliedSorters);
      if (!sorters.length) return 0;

      return sorters.reduce((_, key) => {
        switch (key) {
          case 'number':
          case 'firstName':
          case 'sex':
          case 'bio':
          case 'job':
          case 'birthdate':
          case 'animal': {
            const value = appliedSorters[key];

            switch (value) {
              case 'ascend':
                return a[key] < b[key] ? -1 : 0;
              case 'descend':
                return a[key] > b[key] ? -1 : 0;

              default:
                return 0;
            }
          }

          default:
            return 0;
        }
      }, 0);
    });

  return (
    <>
      <Table.Root<TableRecord>
        filters={filters}
        columns={columns}
        sorters={sorters}
        onFilterValuesChange={React.useCallback((_, values) => {
          console.log('Filters values changed', _, values);
          setAppliedFilters(values);
        }, [])}
        onSorterValuesChange={React.useCallback((_, values) => {
          console.log('Sorters values changed', _, values);
          setAppliedSorters(values);
        }, [])}
        onSearchValueChange={React.useCallback((changed, value) => {
          console.log('Search values changed', changed, value);
          console.log(changed, value);
        }, [])}
        onColumnVisibilityChange={model.display}
        onColumnPinningChange={model.pin}
      >
        <Table.Header.Layout>
          <Table.Search />
          <Table.Toolbar.Layout>
            <Table.Toolbar.Sorters />
            <Table.Toolbar.FiltersButton
              selected={filtersVisibility.visible}
              onClick={filtersVisibility.show}
            />
            <Table.Toolbar.SettingsButton
              selected={columnsSettingsVisibility.visible}
              onClick={columnsSettingsVisibility.show}
            />
          </Table.Toolbar.Layout>
        </Table.Header.Layout>
        <Table.Table
          columns={tableColumns}
          dataSource={filteredDataSource}
          components={components}
          rowSelection={{
            getCheckboxProps: record => ({ id: record.key, value: record.key }),
          }}
          scroll={{ x: 1300 }}
        />
        <Table.Filters
          open={filtersVisibility.visible}
          onClose={filtersVisibility.hide}
        />
        <Table.ColumnsSettings
          open={columnsSettingsVisibility.visible}
          onClose={columnsSettingsVisibility.hide}
          {...columnsSettingsProperties}
        />
      </Table.Root>
    </>
  );
};
