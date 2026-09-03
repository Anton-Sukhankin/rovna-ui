import { position } from './position';

describe('position', () => {
  it.each([
    {
      array: ['a', 'b', 'c'],
      value: 'd',
      position: -1,
      expected: ['a', 'b', 'c'],
    },
    {
      array: ['a', 'b', 'c'],
      value: 'd',
      position: 0,
      expected: ['d', 'a', 'b', 'c'],
    },
    {
      array: ['a', 'b', 'c'],
      value: 'd',
      position: 1,
      expected: ['a', 'd', 'b', 'c'],
    },
    {
      array: ['a', 'b', 'c'],
      value: 'd',
      position: 2,
      expected: ['a', 'b', 'd', 'c'],
    },
    {
      array: ['a', 'b', 'c'],
      value: 'd',
      position: 3,
      expected: ['a', 'b', 'c', 'd'],
    },
    {
      array: ['a', 'b', 'c'],
      value: 'd',
      position: 4,
      expected: ['a', 'b', 'c', 'd'],
    },
  ])('returns correct result for %s', testcase => {
    expect(position<string>(testcase.array, testcase.value, testcase.position)).toEqual(
      testcase.expected,
    );
  });
});
