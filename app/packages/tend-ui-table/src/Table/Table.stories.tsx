import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { uniq, uniqBy } from 'lodash';
import dayjs from 'dayjs';
import { ApiFunctionPayload, useVisibility } from '@rovna-ui/components/hooks';
import { GenericObject } from '@rovna-ui/components/types';
import { MoreHoriz } from '@rovna-ui/components/icons';
import { Alert, Segmented, TableProps } from '@rovna-ui/components/primitives';
import { Button } from '@rovna-ui/primitives';
import { RovnaUI } from '@rovna-ui/components/theme';
import { DrawerColumnsSettings, useColumns } from '@rovna-ui/columns-settings';
import { expect, fireEvent, fn, userEvent, waitFor, within } from 'storybook/test';
import { getRussianAnimal, getRussianPerson } from '@rovna-internal/components/stories/mockData';

import { Table } from '@rovna-ui/table';

import { useRowHighlighter } from './hooks';
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as DefaultCode from './__code__/DefaultCode.raw.tsx?raw';
/* eslint-enable @typescript-eslint/ban-ts-comment */
/* eslint-enable import/no-unresolved */

const composeEntity = (index: number) => {
  const person = getRussianPerson(index);

  return {
    key: `record-${index + 1}`,
    number: `Заявка-${1000 + index}`,
    firstName: person.firstName,
    sex: person.sex,
    bio: person.bio,
    job: person.job,
    birthdate: new Date(1985 + (index % 20), index % 12, (index % 27) + 1),
    animal: getRussianAnimal(index),
    admin: index % 3 === 0,
  };
};

type TableRecord = ReturnType<typeof composeEntity>;
const dataSource = Array.from({ length: 50 }).map((_, index) => composeEntity(index));

const visuallyHiddenStyle: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

const actionsColumnTitle = <span style={visuallyHiddenStyle}>Действия</span>;

type ComponentProps = Pick<
  Table.RootProps,
  | 'onSorterValuesChange'
  | 'onFilterValuesChange'
  | 'onSearchValueChange'
  | 'onFilterValuesFinish'
> & {
  value?: Table.TableForm<TableRecord>;
  storyDataState?: 'default' | 'empty' | 'loading';
  sorters: Table.SorterConfig[];
  columns: Table.ColumnType<TableRecord>[];
  filters: Table.FilterConfig[];
  hotFilters: Table.FilterConfig[];
};
type TableFormValues = {
  contractor: string;
  provider: string;
};
const Component: React.FC<ComponentProps> = props => {
  const [showTour, setShowTour] = React.useState(false);
  const [data] = React.useState(dataSource);
  const [appliedSorters, setAppliedSorters] = React.useState<GenericObject>({});
  const [appliedFilters, setAppliedFilters] = React.useState<GenericObject>({});
  const settings = useColumns({ ignore: ['actions'], defaultColumns: props.columns });

  const filtersVisibility = useVisibility();
  const columnsSettingsVisibility = useVisibility();
  const rowClassName = useRowHighlighter<TableRecord>({
    onError: record => record.sex === 'Мужской',
    onSuccess: record => record.animal === 'Собака',
  });

  const components = React.useMemo<TableProps['components']>(
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
          case "Пол": {
            const value = appliedFilters[key];

            if (!value) return conditions;
            conditions.push(item.sex === value);

            return conditions;
          }
          case "Должность": {
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
          case "Пол":
          case "Описание":
          case "Должность":
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
    <Table.Root<TableRecord>
      settings={settings}
      value={props.value}
      filters={props.filters}
      hotFilters={props.hotFilters}
      sorters={props.sorters}
      onFilterValuesFinish={values => {
        setAppliedFilters(values);
        props.onFilterValuesFinish?.(values);
      }}
      onFilterValuesChange={props.onFilterValuesChange}
      onSorterValuesChange={(a, b) => {
        setAppliedSorters(b);
        props.onSorterValuesChange?.(a, b);
      }}
      onSearchValueChange={props.onSearchValueChange}
    >
      <Table.Tour
        open={showTour}
        onFinish={() => {
          setShowTour(false);
        }}
        onClose={() => {
          setShowTour(false);
        }}
      >
        <Table.Header>
          <Table.ControlPanel
            filtersButtonProps={{ onClick: filtersVisibility.show }}
            settingsButtonProps={{ onClick: columnsSettingsVisibility.show }}
            moreButtonProps={{
              items: [
                { key: '1', label: 'Действие 1' },
                { key: '2', label: 'Действие 2' },
              ],
            }}
          />
          <Table.Search />
          <Table.HotFilters />
          <Button
            onClick={() => {
              setShowTour(true);
            }}
          >
            Онбординг
          </Button>
        </Table.Header>
        <Table.Table
          columns={settings.getAntdTableColumns()}
          dataSource={props.storyDataState === 'empty' ? [] : filteredDataSource}
          loading={props.storyDataState === 'loading'}
          components={components}
          rowClassName={rowClassName}
          rowSelection={{
            getCheckboxProps: record => ({
              id: record.key,
              value: record.key,
              'aria-label': `Выбрать строку ${record.number}`,
            }),
          }}
          scroll={{ x: 1300 }}
        />
        <Table.Filters
          showApplyButton
          open={filtersVisibility.visible}
          onClose={filtersVisibility.hide}
        />
        <DrawerColumnsSettings
          settings={settings}
          open={columnsSettingsVisibility.visible}
          onClose={columnsSettingsVisibility.hide}
          onApply={columnsSettingsVisibility.hide}
        />
      </Table.Tour>
    </Table.Root>
  );
};

const meta: Meta<typeof Component> = {
  title: 'Rovna UI/Table/Table',
  component: Component,
  argTypes: {
    columns: { description: 'Колонки таблицы' },
    filters: { description: 'Фильтра таблицы' },
    onFilterValuesChange: {
      description: 'Функция-колбэк, вызываемая при измении фильтров',
    },
    onSorterValuesChange: {
      type: 'function',
      description: 'Функция-колбэк, вызываемая при измении сортировки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole('checkbox') as HTMLInputElement[];
    await userEvent.click(checkboxes[0]);
    await expect(checkboxes.every(checkbox => checkbox.checked)).toBe(true);
  },
  parameters: {
    docs: {
      source: {
        code: DefaultCode.default,
      },
    },
  },
  args: {
    onFilterValuesFinish: values => {
      console.log('[Default][onFilterValuesFinish]', values);
    },
    onFilterValuesChange: (a, b) => {
      console.log('[Default][onFilterValuesChange]', a, b);
    },
    onSearchValueChange: (a, b) => {
      console.log('[Default][onSearchValueChange]', a, b);
    },
    onSorterValuesChange: (a, b) => {
      console.log('[Default][onSorterValuesChange]', a, b);
    },
    sorters: [
      {
        key: 's-firstName',
        id: 'firstName',
        name: 'firstName',
      },
      {
        key: 's-job',
        id: "Должность",
        name: "Должность",
        variant: 'alphabetical',
      },
      {
        key: 's-birthdate',
        id: 'birthdate',
        name: 'birthdate',
        variant: 'novelty',
      },
    ],
    columns: [
      {
        disabled: true,
        key: 'number',
        id: 'number',
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
        key: "Пол",
        id: "Пол",
        label: 'Пол',
        title: <Table.CellTitle id="Пол">Пол</Table.CellTitle>,
        dataIndex: "Пол",
        onHeaderCell: () => ({
          id: "Пол",
        }),
      },
      {
        key: "Описание",
        id: "Описание",
        label: 'Биография',
        title: <Table.CellTitle id="Описание">Биография</Table.CellTitle>,
        dataIndex: "Описание",
        onHeaderCell: () => ({
          id: "Описание",
        }),
      },
      {
        key: "Должность",
        id: "Должность",
        label: 'Работа',
        title: <Table.CellTitle id="Должность">Работа</Table.CellTitle>,
        dataIndex: "Должность",
        onHeaderCell: () => ({
          id: "Должность",
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
        render: value => (value ? 'Да' : 'Нет'),
        onHeaderCell: () => ({
          id: 'admin',
        }),
      },
      {
        width: 50,
        key: 'actions',
        id: 'actions',
        title: actionsColumnTitle,
        dataIndex: 'actions',
        fixed: 'right',
        render: () => (
          <Button aria-label='Действия со строкой' before={<MoreHoriz />} variant='ghost' />
        ),
      },
    ],
    filters: [
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
        requires: ['number'],
        label: 'Имя',
        component: { component: 'input', placeholder: 'Введите имя' },
      },
      {
        key: 'f-sex',
        id: "Пол",
        name: "Пол",
        label: 'Пол',
        component: {
          component: 'radio-group',
          options: [
            { value: 'Мужской', label: 'Мужчина' },
            { value: 'Женский', label: 'Женщина' },
          ],
        },
      },
      {
        key: 'f-job',
        id: "Должность",
        name: "Должность",
        label: 'Работа',
        depends: ['firstName', 'number'],
        component: {
          component: 'async-select',
          'aria-label': 'Фильтр по должности',
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
    ],
    hotFilters: [
      {
        id: 'number',
        name: 'number',
        label: 'Номер',
        component: { component: 'input', allowClear: true, placeholder: 'Введите номер' },
      },
      {
        key: 'h-f-job',
        id: "Должность",
        name: "Должность",
        label: 'Работа',
        depends: ['firstName', 'number'],
        component: {
          component: 'async-select',
          'aria-label': 'Быстрый фильтр по должности',
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
        key: 'h-f-admin',
        id: 'admin',
        name: 'admin',
        label: 'Админ',
        component: {
          component: 'toggle',
          children: 'Админ',
        },
      },
    ],
  },
};

export const Sorting: Story = {
  args: {
    ...Default.args,
    onSorterValuesChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const sortersButton = canvas.getByRole('button', { name: 'Сортировка таблицы' });
    await userEvent.click(sortersButton);
    const sorters = await page.findByRole('list');
    await userEvent.click(within(sorters).getByText('Имя'));
    await waitFor(() => expect(args.onSorterValuesChange).toHaveBeenCalled());
    await userEvent.click(sortersButton);
    await waitFor(() => expect(sorters).not.toBeVisible(), { timeout: 5_000 });
  },
};

export const KeyboardAccessibility: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const filtersButton = canvas.getByRole('button', { name: 'Фильтры' });

    filtersButton.focus();
    await userEvent.keyboard('{Enter}');
    const dialog = await page.findByRole('dialog', {
      name: 'Фильтрация таблицы',
    });
    await expect(dialog).toBeVisible();
    fireEvent.keyDown(dialog, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
    });
    await waitFor(() => expect(filtersButton).toHaveFocus());
  },
};

export const Empty: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Нет данных')).toBeVisible();
    await expect(canvas.queryByText(/^№ Заявка-/)).not.toBeInTheDocument();
  },
  args: {
    ...Default.args,
    storyDataState: 'empty',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    storyDataState: 'loading',
  },
};

const CustomizationTemplate = (props: ComponentProps) => {
  const [data] = React.useState(dataSource.slice(0, 10));
  const [appliedSorters, setAppliedSorters] = React.useState<GenericObject>({});
  const [appliedFilters, setAppliedFilters] = React.useState<GenericObject>({});

  const settings = useColumns({ defaultColumns: props.columns });

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
          case "Пол": {
            const value = appliedFilters[key];

            if (!value) return conditions;
            conditions.push(item.sex === value);

            return conditions;
          }
          case "Должность": {
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
          case "Пол":
          case "Описание":
          case "Должность":
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
    <Table.Root<TableFormValues>
      settings={settings}
      filters={props.filters}
      columns={props.columns}
      sorters={props.sorters}
      onFilterValuesChange={(_, values) => {
        setAppliedFilters(values);
      }}
      onSorterValuesChange={(_, values) => {
        setAppliedSorters(values);
      }}
      onSearchValueChange={(changed, value) => {
        console.log(changed, value);
      }}
    >
      <Table.Header>
        <Segmented options={['Черновик', 'В работе', 'На согласовании']} />
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
          <Button>Создать заявку</Button>
        </Table.Toolbar.Layout>
      </Table.Header>
      <Alert
        mb={8}
        description='Разнообразный и богатый опыт постоянный количественный рост и сфера нашей
        активности представляет собой интересный эксперимент проверки соответствующий
        условий активизации. Идейные соображения высшего порядка, а также дальнейшее
        развитие различных форм деятельности играет важную роль в формировании модели
        развития.'
      />
      <Table.Table
        columns={settings.getAntdTableColumns()}
        dataSource={filteredDataSource}
        components={components}
        rowSelection={{
          getCheckboxProps: record => ({
            id: record.key,
            value: record.key,
            'aria-label': `Выбрать строку ${record.number}`,
          }),
        }}
        scroll={{ x: 1300 }}
      />
      <Table.Filters open={filtersVisibility.visible} onClose={filtersVisibility.hide} />
      <DrawerColumnsSettings
        settings={settings}
        open={columnsSettingsVisibility.visible}
        onClose={columnsSettingsVisibility.hide}
      />
    </Table.Root>
  );
};
const CustomizationCode = `
import { useColumns, DrawerColumnsSettings } from '@rovna-ui/columns-settings';
import { useVisibility } from '@rovna-ui/components/hooks';
import { Table } from '@rovna-ui/table';
import { Segmented, Alert } from '@rovna-ui/components/primitives';

const table = Table.useTable<TableFormValues>();

const settings = useColumns({ defaultColumns: columns });

const filtersVisibility = useVisibility();
const columnsSettingsVisibility = useVisibility();

const components = React.useMemo(
  () => ({
    header: {
      cell: (props: React.HTMLAttributes<HTMLTableCellElement>) => {
        return (
          <Table.ContextMenu id={props.id}>
            <Table.HeaderCell {...props} />
          </Table.ContextMenu>
        );
      },
    },
  }),
  [],
);

<Table.Root<TableFormValues>
  settings={settings}
  filters={filters}
  onFilterValuesChange={...}
  onSorterValuesChange={...}
  onSearchValueChange={...}
  onColumnVisibilityChange={model.display}
  onColumnPinningChange={model.pin}
>
  <Table.Header.Root>
    <Table.Header>
      <Segmented options={['Черновик', 'В работе', 'На согласовании']} />
      <Table.ControlPanel
        filtersButtonProps={{ onClick: filtersVisibility.visible }}
        settingsButtonProp={{ onClick: columnsSettingsVisibility.visible }}
      />
      <Table.Search />
    </Table.Header>
  </Table.Header.Root>
  <Alert
    mb={8}
    description='Разнообразный и богатый опыт постоянный количественный рост и сфера нашей
    активности представляет собой интересный эксперимент проверки соответствующий
    условий активизации. Идейные соображения высшего порядка, а также дальнейшее
    развитие различных форм деятельности играет важную роль в формировании модели
    развития.'
  />
  <Table.Table
    columns={settings.getAntdTableColumns()}
    dataSource={filteredDataSource}
    components={components}
    rowSelection={{
      getCheckboxProps: record => ({
        id: record.key,
        value: record.key,
        'aria-label': 'Выбрать строку ' + record.number,
      }),
    }}
    scroll={{ x: 1300 }}
  />
  <Table.Filters open={filtersVisibility.visible} onClose={filtersVisibility.hide} />
  <DrawerColumnsSettings
    settings={settings}
    open={columnsSettingsVisibility.visible}
    onClose={columnsSettingsVisibility.hide}
  />
</Table.Root>
`;
export const Customization: Story = {
  parameters: {
    docs: {
      source: {
        code: CustomizationCode,
      },
    },
  },
  args: {
    onFilterValuesChange: (a, b) => {
      console.log('[Customization][onFilterValuesChange]');
      console.log(a, b);
    },
    onSearchValueChange: (a, b) => {
      console.log('[Customization][onSearchValueChange]');
      console.log(a, b);
    },
    onSorterValuesChange: (a, b) => {
      console.log('[Customization][onSorterValuesChange]');
      console.log(a, b);
    },
    columns: [
      {
        disabled: true,
        key: 'number',
        id: 'number',
        label: 'Номер',
        title: <Table.CellTitle id='number'>Номер</Table.CellTitle>,
        dataIndex: 'number',
        onHeaderCell: () => ({
          id: 'number',
        }),
        render: v => `№ ${v}`,
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
        key: "Пол",
        id: "Пол",
        label: 'Пол',
        title: <Table.CellTitle id="Пол">Пол</Table.CellTitle>,
        dataIndex: "Пол",
        onHeaderCell: () => ({
          id: "Пол",
        }),
      },
      {
        key: "Описание",
        id: "Описание",
        label: 'Биография',
        title: <Table.CellTitle id="Описание">Биография</Table.CellTitle>,
        dataIndex: "Описание",
        onHeaderCell: () => ({
          id: "Описание",
        }),
      },
      {
        key: "Должность",
        id: "Должность",
        label: 'Работа',
        title: <Table.CellTitle id="Должность">Работа</Table.CellTitle>,
        dataIndex: "Должность",
        onHeaderCell: () => ({
          id: "Должность",
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
        render: value => (value ? 'Да' : 'Нет'),
        onHeaderCell: () => ({
          id: 'admin',
        }),
      },
      {
        width: 50,
        key: 'actions',
        id: 'actions',
        title: actionsColumnTitle,
        dataIndex: 'actions',
        fixed: 'right',
        render: () => (
          <Button aria-label='Действия со строкой' before={<MoreHoriz />} variant='ghost' />
        ),
      },
    ],
    filters: [
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
        id: "Пол",
        name: "Пол",
        label: 'Пол',
        component: {
          component: 'radio-group',
          options: [
            { value: 'Мужской', label: 'Мужчина' },
            { value: 'Женский', label: 'Женщина' },
          ],
        },
      },
      {
        key: 'f-job',
        id: "Должность",
        name: "Должность",
        label: 'Работа',
        component: {
          component: 'async-select',
          'aria-label': 'Фильтр по должности',
          placeholder: 'Выберите род деятельности',
          api: {
            cache: { key: 'jobs' },
            fn: () => {
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
    ],
  },
  render: CustomizationTemplate,
};
export const Internationalization: Story = {
  args: {
    onFilterValuesChange: (a, b) => {
      console.log('[Internationalization][onFilterValuesChange]');
      console.log(a, b);
    },
    onSearchValueChange: (a, b) => {
      console.log('[Internationalization][onSearchValueChange]');
      console.log(a, b);
    },
    onSorterValuesChange: (a, b) => {
      console.log('[Internationalization][onSorterValuesChange]');
      console.log(a, b);
    },
    columns: [
      {
        disabled: true,
        key: 'number',
        id: 'number',
        label: "Номер",
        title: <Table.CellTitle id='number'>Номер</Table.CellTitle>,
        dataIndex: 'number',
        onHeaderCell: () => ({
          id: 'number',
        }),
        render: v => `№ ${v}`,
      },
      {
        key: 'firstName',
        id: 'firstName',
        label: "Название",
        title: <Table.CellTitle id="Название">Название</Table.CellTitle>,
        dataIndex: 'firstName',
        onHeaderCell: () => ({
          id: 'firstName',
        }),
      },

      {
        key: "Пол",
        id: "Пол",
        label: "Пол",
        title: <Table.CellTitle id="Пол">Пол</Table.CellTitle>,
        dataIndex: "Пол",
        onHeaderCell: () => ({
          id: "Пол",
        }),
      },
      {
        key: "Описание",
        id: "Описание",
        label: "Описание",
        title: <Table.CellTitle id="Описание">Описание</Table.CellTitle>,
        dataIndex: "Описание",
        onHeaderCell: () => ({
          id: "Описание",
        }),
      },
      {
        key: "Должность",
        id: "Должность",
        label: "Должность",
        title: <Table.CellTitle id="Должность">Должность</Table.CellTitle>,
        dataIndex: "Должность",
        onHeaderCell: () => ({
          id: "Должность",
        }),
      },
      {
        pinnable: false,
        key: 'birthdate',
        id: 'birthdate',
        label: "Дата рождения",
        title: <Table.CellTitle id='birthdate'>Дата рождения</Table.CellTitle>,
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
        label: "Животное",
        title: <Table.CellTitle id='animal'>Животное</Table.CellTitle>,
        dataIndex: 'animal',
        onHeaderCell: () => ({
          id: 'animal',
        }),
      },
      {
        key: 'admin',
        id: 'admin',
        label: "Администратор",
        title: <Table.CellTitle id='admin'>Администратор</Table.CellTitle>,
        dataIndex: 'admin',
        render: value => (value ? 'Да' : 'Нет'),
        onHeaderCell: () => ({
          id: 'admin',
        }),
      },
      {
        width: 50,
        key: 'actions',
        id: 'actions',
        title: actionsColumnTitle,
        dataIndex: 'actions',
        fixed: 'right',
        render: () => (
          <Button aria-label='Действия со строкой' before={<MoreHoriz />} variant='ghost' />
        ),
      },
    ],
    filters: [
      {
        key: 'f-number',
        id: 'number',
        name: 'number',
        label: "Номер",
        component: { component: 'input', placeholder: "Введите номер" },
      },
      {
        key: 'f-firstName',
        id: 'firstName',
        name: 'firstName',
        label: 'Имя',
        component: { component: 'input', placeholder: "Введите имя" },
      },
      {
        key: 'f-sex',
        id: "Пол",
        name: "Пол",
        label: "Пол",
        component: {
          component: 'radio-group',
          options: [
            { value: 'Мужской', label: "Мужской" },
            { value: 'Женский', label: "Женский" },
          ],
        },
      },
      {
        key: 'f-job',
        id: "Должность",
        name: "Должность",
        label: "Должность",
        component: {
          component: 'select',
          placeholder: "Выберите должность",
          options: uniqBy(
            dataSource.map(data => ({ value: data.job, label: data.job })),
            'value',
          ),
        },
      },
      {
        key: 'f-birthdate',
        id: 'birthdate',
        name: 'birthdate',
        label: "Дата рождения",
        component: {
          component: 'date-picker',
        },
      },
      {
        key: 'f-animal',
        id: 'animal',
        name: 'animal',
        label: "Животное",
        component: {
          component: 'checkbox-group',
          options: uniq(dataSource.map(data => data.animal)),
        },
      },
      {
        key: 'f-admin',
        id: 'admin',
        name: 'admin',
        label: "Администратор",
        component: {
          component: 'toggle',
          children: "Администратор",
        },
      },
    ],
  },
  decorators: [
    Story => (
      <RovnaUI lang='en'>
        <Story />
      </RovnaUI>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: DefaultCode.default,
      },
    },
  },
};
