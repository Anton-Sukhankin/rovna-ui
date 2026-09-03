import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { getRussianPerson } from '@rovna-internal/components/stories/mockData';

import { SimpleTable } from './SimpleTable';

const meta: Meta<typeof SimpleTable> = {
  title: 'Rovna UI/Main/Primitives/SimpleTable',
  component: SimpleTable,
};

export default meta;
type Story = StoryObj<typeof meta>;

const rows = Array.from({ length: 5 }).map((_, index) => {
  const person = getRussianPerson(index);

  return {
    key: `person-${index + 1}`,
    name: person.fullName,
    job: person.job,
    bio: person.bio,
    sex: person.sex,
    zodiac: person.zodiac,
    salary: 80000 + index * 5000,
  };
});

export const Large: Story = {
  args: {
    size: 'large',
  },
  render: args => (
    <SimpleTable {...args}>
      <SimpleTable.Thead>
        <SimpleTable.Tr>
          <SimpleTable.Th>Название</SimpleTable.Th>
          <SimpleTable.Th>Описание</SimpleTable.Th>
          <SimpleTable.Th>Зарплата</SimpleTable.Th>
          <SimpleTable.Th>Должность</SimpleTable.Th>
          <SimpleTable.Th>Пол</SimpleTable.Th>
        </SimpleTable.Tr>
      </SimpleTable.Thead>
      <SimpleTable.Tbody>
        {rows.map(row => (
          <SimpleTable.Tr key={row.key}>
            <SimpleTable.Td>{row.name}</SimpleTable.Td>
            <SimpleTable.Td>{row.bio}</SimpleTable.Td>
            <SimpleTable.Td>{row.salary}</SimpleTable.Td>
            <SimpleTable.Td>{row.job}</SimpleTable.Td>
            <SimpleTable.Td>{row.sex}</SimpleTable.Td>
          </SimpleTable.Tr>
        ))}
      </SimpleTable.Tbody>
    </SimpleTable>
  ),
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
  render: args => (
    <SimpleTable {...args}>
      <SimpleTable.Thead>
        <SimpleTable.Tr>
          <SimpleTable.Th>Название</SimpleTable.Th>
          <SimpleTable.Th>Описание</SimpleTable.Th>
          <SimpleTable.Th>Зарплата</SimpleTable.Th>
          <SimpleTable.Th>Должность</SimpleTable.Th>
          <SimpleTable.Th>Пол</SimpleTable.Th>
        </SimpleTable.Tr>
      </SimpleTable.Thead>
      <SimpleTable.Tbody>
        {rows.map(row => (
          <SimpleTable.Tr key={row.key}>
            <SimpleTable.Td>{row.name}</SimpleTable.Td>
            <SimpleTable.Td>{row.bio}</SimpleTable.Td>
            <SimpleTable.Td>{row.salary}</SimpleTable.Td>
            <SimpleTable.Td>{row.job}</SimpleTable.Td>
            <SimpleTable.Td>{row.sex}</SimpleTable.Td>
          </SimpleTable.Tr>
        ))}
      </SimpleTable.Tbody>
    </SimpleTable>
  ),
};

export const Small: Story = {
  args: {
    size: 'small',
  },
  render: args => (
    <SimpleTable {...args}>
      <SimpleTable.Thead>
        <SimpleTable.Tr>
          <SimpleTable.Th>Название</SimpleTable.Th>
          <SimpleTable.Th>Описание</SimpleTable.Th>
          <SimpleTable.Th>Зарплата</SimpleTable.Th>
          <SimpleTable.Th>Должность</SimpleTable.Th>
          <SimpleTable.Th>Пол</SimpleTable.Th>
        </SimpleTable.Tr>
      </SimpleTable.Thead>
      <SimpleTable.Tbody>
        {rows.map(row => (
          <SimpleTable.Tr key={row.key}>
            <SimpleTable.Td>{row.name}</SimpleTable.Td>
            <SimpleTable.Td>{row.bio}</SimpleTable.Td>
            <SimpleTable.Td>{row.salary}</SimpleTable.Td>
            <SimpleTable.Td>{row.job}</SimpleTable.Td>
            <SimpleTable.Td>{row.sex}</SimpleTable.Td>
          </SimpleTable.Tr>
        ))}
      </SimpleTable.Tbody>
    </SimpleTable>
  ),
};

export const Selected: Story = {
  args: {
    size: 'medium',
  },
  render: args => (
    <SimpleTable {...args}>
      <SimpleTable.Thead>
        <SimpleTable.Tr>
          <SimpleTable.Th>Название</SimpleTable.Th>
          <SimpleTable.Th>Описание</SimpleTable.Th>
          <SimpleTable.Th>Зарплата</SimpleTable.Th>
          <SimpleTable.Th>Должность</SimpleTable.Th>
          <SimpleTable.Th>Пол</SimpleTable.Th>
        </SimpleTable.Tr>
      </SimpleTable.Thead>
      <SimpleTable.Tbody>
        {rows.map(row => (
          <SimpleTable.Tr selected key={row.key}>
            <SimpleTable.Td>{row.name}</SimpleTable.Td>
            <SimpleTable.Td>{row.bio}</SimpleTable.Td>
            <SimpleTable.Td>{row.salary}</SimpleTable.Td>
            <SimpleTable.Td>{row.job}</SimpleTable.Td>
            <SimpleTable.Td>{row.sex}</SimpleTable.Td>
          </SimpleTable.Tr>
        ))}
      </SimpleTable.Tbody>
    </SimpleTable>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: args => (
    <SimpleTable {...args}>
      <SimpleTable.Thead>
        <SimpleTable.Tr>
          <SimpleTable.Th>Название</SimpleTable.Th>
          <SimpleTable.Th>Описание</SimpleTable.Th>
          <SimpleTable.Th>Зарплата</SimpleTable.Th>
          <SimpleTable.Th>Должность</SimpleTable.Th>
          <SimpleTable.Th>Пол</SimpleTable.Th>
        </SimpleTable.Tr>
      </SimpleTable.Thead>
      <SimpleTable.Tbody>
        {rows.map(row => (
          <SimpleTable.Tr key={row.key}>
            <SimpleTable.Td>{row.name}</SimpleTable.Td>
            <SimpleTable.Td>{row.bio}</SimpleTable.Td>
            <SimpleTable.Td>{row.salary}</SimpleTable.Td>
            <SimpleTable.Td>{row.job}</SimpleTable.Td>
            <SimpleTable.Td>{row.sex}</SimpleTable.Td>
          </SimpleTable.Tr>
        ))}
      </SimpleTable.Tbody>
    </SimpleTable>
  ),
};
