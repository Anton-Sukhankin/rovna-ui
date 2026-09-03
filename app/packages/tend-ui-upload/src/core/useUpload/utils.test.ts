import { difference } from './utils';

describe('difference', () => {
  it.each([
    {
      current: {
        a: 1,
        b: 2,
      },
      next: {
        a: 2,
        b: 3,
      },
      expected: { a: 2, b: 3 },
    },
    {
      current: {
        a: 1,
        b: 2,
        c: 3,
      },
      next: {
        a: 4,
        b: 5,
      },
      expected: { a: 4, b: 5, c: 3 },
    },
    {
      current: {
        a: 1,
        b: 2,
        c: 3,
      },
      next: {
        b: 5,
      },
      expected: { a: 1, b: 5, c: 3 },
    },
    {
      current: {
        a: 1,
        b: 2,
        c: 3,
      },
      next: {
        d: 5,
      },
      expected: { a: 1, b: 2, c: 3, d: 5 },
    },
  ])('returns correct result', testcase => {
    expect(difference(testcase.current, testcase.next)).toEqual(testcase.expected);
  });
});
