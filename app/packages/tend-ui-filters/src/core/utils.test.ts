import dayjs from 'dayjs';

import { mapSavedPresetsToPresets, patch } from './utils';

describe('patch', () => {
  it.each([
    {
      previous: { name: 'John' },
      next: { surname: 'Smith', age: 30 },
      expected: { surname: 'Smith', age: 30, name: undefined },
    },
    {
      previous: { name: 'John', surname: 'Snow', age: 10 },
      next: { surname: 'Smith', age: 30 },
      expected: { surname: 'Smith', age: 30, name: undefined },
    },
    {
      previous: { name: 'John', surname: 'Snow' },
      next: { name: 'Will', surname: 'Smith' },
      expected: { name: 'Will', surname: 'Smith' },
    },
    {
      previous: {},
      next: { name: 'Will', surname: 'Smith' },
      expected: { name: 'Will', surname: 'Smith' },
    },
    {
      previous: { age: 40, job: 'IT' },
      next: { name: 'Will', surname: 'Smith' },
      expected: { name: 'Will', surname: 'Smith', age: undefined, job: undefined },
    },
  ] as const)('returns correct result', testcase => {
    const result = patch(testcase.previous, testcase.next);
    expect(result).toStrictEqual(testcase.expected);
  });
  it.each([
    {
      previous: { name: 'default', surname: 'default' },
      next: { name: 'ascend', surname: 'descend' },
      expected: { name: 'ascend', surname: 'descend' },
    },
    {
      previous: { name: 'default', surname: 'default', job: 'ascend' },
      next: { name: 'ascend', surname: 'descend' },
      expected: { name: 'ascend', surname: 'descend', job: 'default' },
    },
    {
      previous: {},
      next: { name: 'ascend', surname: 'descend' },
      expected: { name: 'ascend', surname: 'descend' },
    },
    {
      previous: { job: 'descend' },
      next: { name: 'ascend', surname: 'descend' },
      expected: { name: 'ascend', surname: 'descend', job: 'default' },
    },
  ] as const)('returns correct result', testcase => {
    const result = patch(testcase.previous, testcase.next, 'default');
    expect(result).toStrictEqual(testcase.expected);
  });
});

describe('mapSavedPresetsToPresets', () => {
  it.each([
    {
      presets: [
        {
          id: '1',
          label: 'Preset 1',
          value: {
            name: 'Hello World',
          },
        },
        {
          id: '2',
          label: 'Preset 2',
          value: {
            price: 123,
          },
        },
        {
          id: '3',
          label: 'Preset 3',
          value: {
            comitet: '2025-02-25T12:47:50.030Z',
          },
        },
        {
          id: '4',
          label: 'Preset 4',
          value: {
            material: ['A', 'B', 'C'],
          },
        },
        {
          id: '5',
          label: 'Preset 5',
          value: {
            comitet: ['2025-02-25T12:47:50.030Z', null],
          },
        },
        {
          id: '6',
          label: 'Preset 6',
          value: {
            comitet: [1, 2],
          },
        },
      ],
      expected: [
        {
          id: '1',
          label: 'Preset 1',
          value: {
            name: 'Hello World',
          },
        },
        {
          id: '2',
          label: 'Preset 2',
          value: {
            price: 123,
          },
        },
        {
          id: '3',
          label: 'Preset 3',
          value: {
            comitet: dayjs('2025-02-25T12:47:50.030Z'),
          },
        },
        {
          id: '4',
          label: 'Preset 4',
          value: {
            material: ['A', 'B', 'C'],
          },
        },
        {
          id: '5',
          label: 'Preset 5',
          value: {
            comitet: [dayjs('2025-02-25T12:47:50.030Z'), null],
          },
        },
        {
          id: '6',
          label: 'Preset 6',
          value: {
            comitet: [1, 2],
          },
        },
      ],
    },
  ])('returns correct result', testcase => {
    expect(mapSavedPresetsToPresets(testcase.presets)).toEqual(testcase.expected);
  });
});
