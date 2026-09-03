import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { SimpleTable } from './SimpleTable';

describe('SimpleTable', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <SimpleTable>
        <SimpleTable.Thead>
          <SimpleTable.Tr>
            <SimpleTable.Th>Name</SimpleTable.Th>
            <SimpleTable.Th>Bio</SimpleTable.Th>
            <SimpleTable.Th>Salary</SimpleTable.Th>
            <SimpleTable.Th>Job</SimpleTable.Th>
            <SimpleTable.Th>Sex</SimpleTable.Th>
          </SimpleTable.Tr>
        </SimpleTable.Thead>
        <SimpleTable.Tbody>
          <SimpleTable.Tr>
            <SimpleTable.Td>John</SimpleTable.Td>
            <SimpleTable.Td>John Hancock</SimpleTable.Td>
            <SimpleTable.Td>2000</SimpleTable.Td>
            <SimpleTable.Td>A super hero</SimpleTable.Td>
            <SimpleTable.Td>male</SimpleTable.Td>
          </SimpleTable.Tr>
        </SimpleTable.Tbody>
      </SimpleTable>,
    );

    expect(snap).toMatchSnapshot();
  });
  describe.each([
    ['margin', 16],
    ['margin', '16px'],
    ['mt', 16],
    ['mt', '16px'],
    ['mr', 16],
    ['mr', '16px'],
    ['mb', 16],
    ['mb', '16px'],
    ['ml', 16],
    ['ml', '16px'],
  ] as const)('and has %s property ', (property, value) => {
    it('renders correctly', () => {
      const props = {
        [property]: value,
      };

      const snap = snapshotWithTheme(
        <SimpleTable {...props}>
          <SimpleTable.Thead>
            <SimpleTable.Tr>
              <SimpleTable.Th>Name</SimpleTable.Th>
              <SimpleTable.Th>Bio</SimpleTable.Th>
              <SimpleTable.Th>Salary</SimpleTable.Th>
              <SimpleTable.Th>Job</SimpleTable.Th>
              <SimpleTable.Th>Sex</SimpleTable.Th>
            </SimpleTable.Tr>
          </SimpleTable.Thead>
          <SimpleTable.Tbody>
            <SimpleTable.Tr>
              <SimpleTable.Td>John</SimpleTable.Td>
              <SimpleTable.Td>John Hancock</SimpleTable.Td>
              <SimpleTable.Td>2000</SimpleTable.Td>
              <SimpleTable.Td>A super hero</SimpleTable.Td>
              <SimpleTable.Td>male</SimpleTable.Td>
            </SimpleTable.Tr>
          </SimpleTable.Tbody>
        </SimpleTable>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
