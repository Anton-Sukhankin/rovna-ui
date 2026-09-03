import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { FolderAdd } from '@rovna-ui/icons/FolderAdd';
import { FolderRemove } from '@rovna-ui/icons/FolderRemove';

import { RovnaUI } from '@rovna-internal/components/theme';
import { getRussianPerson } from '@rovna-internal/components/stories/mockData';

import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Rovna UI/Main/Primitives/Table',
  component: Table,
};

let generatedPersonIndex = 0;

const composePerson = (_?: unknown, index?: number) => {
  const resolvedIndex = index ?? generatedPersonIndex++;
  const person = getRussianPerson(resolvedIndex);

  return {
    key: `person-${resolvedIndex + 1}`,
    name: person.fullName,
    job: person.job,
    bio: person.bio,
    sex: person.sex,
    zodiac: person.zodiac,
    salary: 80000 + resolvedIndex * 5000,
  };
};

const dataSource = Array.from({ length: 10 }).map(composePerson);
const columnTitles: Record<string, string> = {
  name: 'Имя',
  job: 'Должность',
  bio: 'Описание',
  sex: 'Пол',
  zodiac: 'Знак зодиака',
  salary: 'Зарплата',
};
const columns = Object.keys(dataSource[0])
  .filter(k => k !== 'key')
  .map(value => {
    return {
      key: value,
      title: columnTitles[value],
      dataIndex: value,
    };
  });

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    dataSource,
  },
};
export const Large: Story = {
  args: {
    columns,
    dataSource,
    size: 'large',
  },
};
export const Small: Story = {
  args: {
    columns,
    dataSource,
    size: 'small',
  },
};
export const Selection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectAll = canvas.getByRole('checkbox', { name: 'Выбрать все строки' });
    await userEvent.click(selectAll);
    await expect(selectAll).toBeChecked();
  },
  args: {
    columns,
    dataSource,
    rowSelection: {
      columnTitle: checkboxNode =>
        React.cloneElement(checkboxNode as React.ReactElement, {
          'aria-label': 'Выбрать все строки',
        }),
      onChange: (keys, rows) => {
        console.log(keys, rows);
      },
      getCheckboxProps: data => ({
        'aria-label': `Выбрать строку: ${data.name}`,
      }),
    },
  },
};
export const Empty: Story = {
  args: {
    columns,
    dataSource: [],
    empty: {
      title: 'Ничего не найдено',
      description: 'Возможно, ваши фильтры что-то скрывают',
    },
  },
};
export const Loading: Story = {
  args: {
    loading: true,
    columns,
    dataSource: [],
  },
};
export const Bordered: Story = {
  args: {
    columns,
    dataSource,
    bordered: true,
  },
};
export const Pinning: Story = {
  args: {
    columns: [
      {
        key: "Название",
        title: "Название",
        dataIndex: "Название",
        fixed: 'left',
      },
      {
        key: "Должность",
        title: "Должность",
        dataIndex: "Должность",
      },
      {
        key: "Описание",
        title: "Описание",
        dataIndex: "Описание",
      },
      {
        key: "Пол",
        title: "Пол",
        dataIndex: "Пол",
      },
      {
        key: "Знак зодиака",
        title: "Знак зодиака",
        dataIndex: "Знак зодиака",
        fixed: 'right',
      },
    ],
    dataSource,
    scroll: { x: 1500 },
  },
};
const SortingCode = `
<Table
  columns={[
    {
      key: 'name',
      title: 'name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      key: 'job',
      title: 'job',
      dataIndex: 'job',
    },
    {
      key: 'bio',
      title: 'bio',
      dataIndex: 'bio',
    },
    {
      key: 'sex',
      title: 'sex',
      dataIndex: 'sex',
    },
    {
      key: 'zodiac',
      title: 'zodiac',
      dataIndex: 'zodiac',
    },
    {
      key: 'salary',
      title: 'salary',
      dataIndex: 'salary',
      sorter: (a, b) => a.salary - b.salary,
    },
  ]}
  dataSource={[
    {
      key: 'some-unique-key',
      name: 'Justin Weimann Jr.',
      job: 'Chief Data Consultant',
      bio: 'geek, musician, engineer',
      sex: 'female',
      zodiac: 'Gemini',
      salary: 3762,
    },
    {
      key: 'some-unique-key',
      name: "Elmer O'Keefe",
      job: 'Corporate Applications Director',
      bio: 'veteran, inventor, student',
      sex: 'female',
      zodiac: 'Aquarius',
      salary: 3159,
    },
    {
      key: 'some-unique-key',
      name: 'Victor Hoppe',
      job: 'Direct Quality Administrator',
      bio: 'developer, gamer',
      sex: 'female',
      zodiac: 'Pisces',
      salary: 2603,
    },
    {
      key: 'some-unique-key',
      name: 'Celia Hodkiewicz',
      job: 'Direct Group Designer',
      bio: 'teacher, leader, gamer ☂️',
      sex: 'female',
      zodiac: 'Capricorn',
      salary: 3178,
    },
    {
      key: 'some-unique-key',
      name: 'Warren Rodriguez III',
      job: 'Corporate Research Executive',
      bio: 'filmmaker, scientist',
      sex: 'female',
      zodiac: 'Aries',
      salary: 5801,
    },
    {
      key: 'some-unique-key',
      name: 'Neil Reichel',
      job: 'Global Integration Associate',
      bio: 'educator, philosopher, friend ⚕️',
      sex: 'female',
      zodiac: 'Virgo',
      salary: 2435,
    },
    {
      key: 'some-unique-key',
      name: 'Audrey Jacobson',
      job: 'Direct Directives Analyst',
      bio: 'orchid devotee, veteran',
      sex: 'male',
      zodiac: 'Capricorn',
      salary: 2768,
    },
    {
      key: 'some-unique-key',
      name: 'Christie Marquardt',
      job: 'Human Applications Agent',
      bio: 'hatchling advocate  🇬🇱',
      sex: 'male',
      zodiac: 'Pisces',
      salary: 2219,
    },
    {
      key: 'some-unique-key',
      name: 'Everett Stokes',
      job: 'Investor Marketing Administrator',
      bio: 'windscreen fan  🎁',
      sex: 'female',
      zodiac: 'Pisces',
      salary: 5106,
    },
    {
      key: 'some-unique-key',
      name: 'Francisco Green',
      job: 'Corporate Assurance Administrator',
      bio: 'usher advocate, dreamer',
      sex: 'male',
      zodiac: 'Capricorn',
      salary: 5892,
    },
  ]}
/>
`;
export const Sorting: Story = {
  args: {
    columns: [
      {
        key: "Название",
        title: "Название",
        dataIndex: "Название",
        fixed: 'left',
      },
      {
        key: "Должность",
        title: "Должность",
        dataIndex: "Должность",
      },
      {
        key: "Описание",
        title: "Описание",
        dataIndex: "Описание",
      },
      {
        key: "Пол",
        title: "Пол",
        dataIndex: "Пол",
      },
      {
        key: "Знак зодиака",
        title: "Знак зодиака",
        dataIndex: "Знак зодиака",
      },
      {
        key: "Зарплата",
        title: "Зарплата",
        dataIndex: "Зарплата",
        sorter: (a, b) => a.salary - b.salary,
      },
    ],
    dataSource,
  },
  parameters: {
    docs: {
      source: {
        code: SortingCode,
      },
    },
  },
};

const FilteringCode = `
const dataSource = [
  {
    key: 'some-unique-key',
    name: 'Justin Weimann Jr.',
    job: 'Chief Data Consultant',
    bio: 'geek, musician, engineer',
    sex: 'female',
    zodiac: 'Gemini',
    salary: 3762,
  },
  {
    key: 'some-unique-key',
    name: "Elmer O'Keefe",
    job: 'Corporate Applications Director',
    bio: 'veteran, inventor, student',
    sex: 'female',
    zodiac: 'Aquarius',
    salary: 3159,
  },
  {
    key: 'some-unique-key',
    name: 'Victor Hoppe',
    job: 'Direct Quality Administrator',
    bio: 'developer, gamer',
    sex: 'female',
    zodiac: 'Pisces',
    salary: 2603,
  },
  {
    key: 'some-unique-key',
    name: 'Celia Hodkiewicz',
    job: 'Direct Group Designer',
    bio: 'teacher, leader, gamer ☂️',
    sex: 'female',
    zodiac: 'Capricorn',
    salary: 3178,
  },
  {
    key: 'some-unique-key',
    name: 'Warren Rodriguez III',
    job: 'Corporate Research Executive',
    bio: 'filmmaker, scientist',
    sex: 'female',
    zodiac: 'Aries',
    salary: 5801,
  },
  {
    key: 'some-unique-key',
    name: 'Neil Reichel',
    job: 'Global Integration Associate',
    bio: 'educator, philosopher, friend ⚕️',
    sex: 'female',
    zodiac: 'Virgo',
    salary: 2435,
  },
  {
    key: 'some-unique-key',
    name: 'Audrey Jacobson',
    job: 'Direct Directives Analyst',
    bio: 'orchid devotee, veteran',
    sex: 'male',
    zodiac: 'Capricorn',
    salary: 2768,
  },
  {
    key: 'some-unique-key',
    name: 'Christie Marquardt',
    job: 'Human Applications Agent',
    bio: 'hatchling advocate  🇬🇱',
    sex: 'male',
    zodiac: 'Pisces',
    salary: 2219,
  },
  {
    key: 'some-unique-key',
    name: 'Everett Stokes',
    job: 'Investor Marketing Administrator',
    bio: 'windscreen fan  🎁',
    sex: 'female',
    zodiac: 'Pisces',
    salary: 5106,
  },
  {
    key: 'some-unique-key',
    name: 'Francisco Green',
    job: 'Corporate Assurance Administrator',
    bio: 'usher advocate, dreamer',
    sex: 'male',
    zodiac: 'Capricorn',
    salary: 5892,
  },
];

<Table
  columns={[
    {
      key: 'name',
      title: 'name',
      dataIndex: 'name',
      filters: dataSource.map(source => ({ text: source.name, value: source.name })),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      key: 'job',
      title: 'job',
      dataIndex: 'job',
    },
    {
      key: 'bio',
      title: 'bio',
      dataIndex: 'bio',
    },
    {
      key: 'sex',
      title: 'sex',
      dataIndex: 'sex',
    },
    {
      key: 'zodiac',
      title: 'zodiac',
      dataIndex: 'zodiac',
    },
    {
      key: 'salary',
      title: 'salary',
      dataIndex: 'salary',
    },
  ]}
  dataSource={dataSource}
/>;
`;
export const Filtering: Story = {
  args: {
    columns: [
      {
        key: "Название",
        title: "Название",
        dataIndex: "Название",
        filters: dataSource.map(source => ({ text: source.name, value: source.name })),
        onFilter: (value, record) => record.name.indexOf(value) === 0,
      },
      {
        key: "Должность",
        title: "Должность",
        dataIndex: "Должность",
      },
      {
        key: "Описание",
        title: "Описание",
        dataIndex: "Описание",
      },
      {
        key: "Пол",
        title: "Пол",
        dataIndex: "Пол",
      },
      {
        key: "Знак зодиака",
        title: "Знак зодиака",
        dataIndex: "Знак зодиака",
      },
      {
        key: "Зарплата",
        title: "Зарплата",
        dataIndex: "Зарплата",
      },
    ],
    dataSource,
  },
  parameters: {
    docs: {
      source: {
        code: FilteringCode,
      },
    },
  },
};
export const Aligning: Story = {
  args: {
    columns: [
      {
        key: "Название",
        title: "Название",
        dataIndex: "Название",
        align: 'center',
      },
      {
        key: "Должность",
        title: "Должность",
        dataIndex: "Должность",
      },
      {
        key: "Описание",
        title: "Описание",
        dataIndex: "Описание",
      },
      {
        key: "Пол",
        title: "Пол",
        dataIndex: "Пол",
      },
      {
        key: "Знак зодиака",
        title: "Знак зодиака",
        dataIndex: "Знак зодиака",
      },
      {
        key: "Зарплата",
        title: "Зарплата",
        dataIndex: "Зарплата",
        align: 'right',
      },
    ],
    dataSource,
  },
};
export const Expand: Story = {
  args: {
    columns: [
      {
        key: "Тест",
        title: "Тест",
        dataIndex: "Тест",
      },
      {
        key: 'expand',
        title: "Название",
        dataIndex: "Название",
      },
      {
        key: "Должность",
        title: "Должность",
        dataIndex: "Должность",
      },
      {
        key: "Описание",
        title: "Описание",
        dataIndex: "Описание",
      },
      {
        key: "Пол",
        title: "Пол",
        dataIndex: "Пол",
      },
      {
        key: "Знак зодиака",
        title: "Знак зодиака",
        dataIndex: "Знак зодиака",
      },
      {
        key: "Зарплата",
        title: "Зарплата",
        dataIndex: "Зарплата",
      },
    ],
    indentSize: 30,
    dataSource: Array.from({ length: 5 }).map(() => {
      return {
        ...composePerson(),
        children: Array.from({ length: 5 }).map(() => {
          return {
            ...composePerson(),
            children: Array.from({ length: 5 }).map(() => {
              return {
                ...composePerson(),
                children: Array.from({ length: 5 }).map(composePerson),
              };
            }),
          };
        }),
      };
    }),
  },
};
const ExpandIconCode = `
<Table
  expandable={{
    expandIcon: parameters => {
      if (!parameters.expandable) return null;

      return parameters.expanded ? (
        <FolderRemove
          onClick={e => {
            parameters.onExpand(parameters.record, e);
          }}
          mr={8}
          size={16}
          color='blue600'
        />
      ) : (
        <FolderAdd
          onClick={e => {
            parameters.onExpand(parameters.record, e);
          }}
          mr={8}
          size={16}
          color='blue600'
        />
      );
    },
  }}
/>;
`;
export const ExpandIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: ExpandIconCode,
      },
    },
  },
  args: {
    expandable: {
      expandIcon: parameters => {
        if (!parameters.expandable) return null;

        return parameters.expanded ? (
          <FolderRemove
            onClick={e => {
              parameters.onExpand(parameters.record, e);
            }}
            mr={8}
            size={16}
            color='blue600'
          />
        ) : (
          <FolderAdd
            onClick={e => {
              parameters.onExpand(parameters.record, e);
            }}
            mr={8}
            size={16}
            color='blue600'
          />
        );
      },
    },
    columns: [
      {
        key: "Название",
        title: "Название",
        dataIndex: "Название",
      },
      {
        key: "Должность",
        title: "Должность",
        dataIndex: "Должность",
      },
      {
        key: "Описание",
        title: "Описание",
        dataIndex: "Описание",
      },
      {
        key: "Пол",
        title: "Пол",
        dataIndex: "Пол",
      },
      {
        key: "Знак зодиака",
        title: "Знак зодиака",
        dataIndex: "Знак зодиака",
      },
      {
        key: "Зарплата",
        title: "Зарплата",
        dataIndex: "Зарплата",
      },
    ],
    indentSize: 30,
    dataSource: Array.from({ length: 5 }).map(() => {
      return {
        ...composePerson(),
        children: Array.from({ length: 5 }).map(() => {
          return {
            ...composePerson(),
            children: Array.from({ length: 5 }).map(() => {
              return {
                ...composePerson(),
                children: Array.from({ length: 5 }).map(composePerson),
              };
            }),
          };
        }),
      };
    }),
  },
};
const SummaryCode = `
<Table
  summary={() => {
    return (
      <Table.Summary>
       <Table.Summary.Row>
        <Table.Summary.Cell index={0} colSpan={1} />
        <Table.Summary.Cell index={1} colSpan={5}>
          Summary
        </Table.Summary.Cell>
       </Table.Summary.Row>
      </Table.Summary>
    );
  }}
/>;
`;
export const Summary: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Cумма значений свойств `colSpan` должна быть равна сумме колонок в таблице',
      },
      source: {
        code: SummaryCode,
      },
    },
  },
  args: {
    scroll: { x: 1500 },
    columns,
    dataSource,
    summary: _data => {
      return (
        <Table.Summary>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={1} />
            <Table.Summary.Cell index={1} colSpan={5}>
              Итого
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      );
    },
  },
};
export const Virtual: Story = {
  args: {
    columns,
    dataSource: Array.from({ length: 5000 }).map(composePerson),
    virtual: true,
    scroll: { y: 500 },
  },
};

const TextEllipsisCode = `
import { Paragraph } from '@rovna-ui/components/typography';
import { Table } from '@rovna-ui/components/primitives';

const column = {
  key: 'name',
  title: <Table.TextHeader width={100}>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, pariatur.
  </Table.TextHeader>,
  dataIndex: 'name',
  width: 100,
  render: () => (
    <Table.TextCell>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt at natus
      vitae corporis officia fuga suscipit enim ullam, nesciunt labore!
    </Table.TextCell>
  ),
};
`;
export const TextEllipsis: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`<TextHeader />` компонент работает корректно только с заранее проставленной шириной колонки',
      },
      source: {
        code: TextEllipsisCode,
      },
    },
  },
  args: {
    columns: [
      {
        key: "Название",
        title: (
          <Table.TextHeader width={100}>
            Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.
          </Table.TextHeader>
        ),
        dataIndex: "Название",
        width: 100,
        render: () => (
          <Table.TextCell>
            Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.
          </Table.TextCell>
        ),
      },
      {
        key: "Должность",
        width: 100,
        title: (
          <Table.TextHeader width={100}>
            Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.
          </Table.TextHeader>
        ),
        dataIndex: "Должность",
        render: () => (
          <Table.TextCell>
            Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.
          </Table.TextCell>
        ),
      },
      {
        key: "Описание",
        width: 100,
        title: (
          <Table.TextHeader width={100}>
            Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.
          </Table.TextHeader>
        ),
        dataIndex: "Описание",
        render: () => (
          <Table.TextCell>
            Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.
          </Table.TextCell>
        ),
      },
      {
        key: "Пол",
        width: 100,
        title: (
          <Table.TextHeader width={100}>
            Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.
          </Table.TextHeader>
        ),
        dataIndex: "Пол",
        render: () => (
          <Table.TextCell>
            Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.
          </Table.TextCell>
        ),
      },
      {
        key: "Знак зодиака",
        width: 100,
        title: (
          <Table.TextHeader width={100}>
            Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.
          </Table.TextHeader>
        ),
        dataIndex: "Знак зодиака",
        render: () => (
          <Table.TextCell>
            Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.
          </Table.TextCell>
        ),
      },
    ],
    dataSource: dataSource.slice(0, 3),
  },
};

const InternationalizationCode = `
const dataSource = [
  {
    key: 'some-unique-key',
    name: 'Justin Weimann Jr.',
    job: 'Chief Data Consultant',
    bio: 'geek, musician, engineer',
    sex: 'female',
    zodiac: 'Gemini',
    salary: 3762,
  },
  {
    key: 'some-unique-key',
    name: "Elmer O'Keefe",
    job: 'Corporate Applications Director',
    bio: 'veteran, inventor, student',
    sex: 'female',
    zodiac: 'Aquarius',
    salary: 3159,
  },
  {
    key: 'some-unique-key',
    name: 'Victor Hoppe',
    job: 'Direct Quality Administrator',
    bio: 'developer, gamer',
    sex: 'female',
    zodiac: 'Pisces',
    salary: 2603,
  },
  {
    key: 'some-unique-key',
    name: 'Celia Hodkiewicz',
    job: 'Direct Group Designer',
    bio: 'teacher, leader, gamer ☂️',
    sex: 'female',
    zodiac: 'Capricorn',
    salary: 3178,
  },
  {
    key: 'some-unique-key',
    name: 'Warren Rodriguez III',
    job: 'Corporate Research Executive',
    bio: 'filmmaker, scientist',
    sex: 'female',
    zodiac: 'Aries',
    salary: 5801,
  },
  {
    key: 'some-unique-key',
    name: 'Neil Reichel',
    job: 'Global Integration Associate',
    bio: 'educator, philosopher, friend ⚕️',
    sex: 'female',
    zodiac: 'Virgo',
    salary: 2435,
  },
  {
    key: 'some-unique-key',
    name: 'Audrey Jacobson',
    job: 'Direct Directives Analyst',
    bio: 'orchid devotee, veteran',
    sex: 'male',
    zodiac: 'Capricorn',
    salary: 2768,
  },
  {
    key: 'some-unique-key',
    name: 'Christie Marquardt',
    job: 'Human Applications Agent',
    bio: 'hatchling advocate  🇬🇱',
    sex: 'male',
    zodiac: 'Pisces',
    salary: 2219,
  },
  {
    key: 'some-unique-key',
    name: 'Everett Stokes',
    job: 'Investor Marketing Administrator',
    bio: 'windscreen fan  🎁',
    sex: 'female',
    zodiac: 'Pisces',
    salary: 5106,
  },
  {
    key: 'some-unique-key',
    name: 'Francisco Green',
    job: 'Corporate Assurance Administrator',
    bio: 'usher advocate, dreamer',
    sex: 'male',
    zodiac: 'Capricorn',
    salary: 5892,
  },
];

<RovnaUI lang='en'>
  <Table
    columns={[
      {
        key: 'name',
        title: 'name',
        dataIndex: 'name',
        filters: dataSource.map(source => ({ text: source.name, value: source.name })),
        onFilter: (value, record) => record.name.indexOf(value) === 0,
      },
      {
        key: 'job',
        title: 'job',
        dataIndex: 'job',
      },
      {
        key: 'bio',
        title: 'bio',
        dataIndex: 'bio',
      },
      {
        key: 'sex',
        title: 'sex',
        dataIndex: 'sex',
      },
      {
        key: 'zodiac',
        title: 'zodiac',
        dataIndex: 'zodiac',
      },
      {
        key: 'salary',
        title: 'salary',
        dataIndex: 'salary',
      },
    ]}
    dataSource={dataSource}
  />
</RovnaUI>;
`;
export const Internationalization: Story = {
  args: {
    columns: [
      {
        key: "Название",
        title: "Название",
        dataIndex: "Название",
        fixed: 'left',
      },
      {
        key: "Должность",
        title: "Должность",
        dataIndex: "Должность",
      },
      {
        key: "Описание",
        title: "Описание",
        dataIndex: "Описание",
      },
      {
        key: "Пол",
        title: "Пол",
        dataIndex: "Пол",
      },
      {
        key: "Знак зодиака",
        title: "Знак зодиака",
        dataIndex: "Знак зодиака",
      },
      {
        key: "Зарплата",
        title: "Зарплата",
        dataIndex: "Зарплата",
        sorter: (a, b) => a.salary - b.salary,
      },
    ],
    dataSource,
  },
  parameters: {
    docs: {
      source: {
        code: InternationalizationCode,
      },
    },
  },
  render: args => (
    <RovnaUI lang='en'>
      <Table {...args} />
    </RovnaUI>
  ),
};
