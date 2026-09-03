import { NumberFormatter } from './NumberFormatter';

describe('NumberFormatter', () => {
  it.each([
    // Integer
    {
      value: 1,
      options: {},
      expected: '1',
    },
    {
      value: 10,
      options: {},
      expected: '10',
    },
    {
      value: 100,
      options: {},
      expected: '100',
    },
    {
      value: 1000,
      options: {},
      expected: '1\xa0000',
    },
    {
      value: 10000,
      options: {},
      expected: '10\xa0000',
    },

    {
      value: 1.5,
      options: {},
      expected: '1,5',
    },
    {
      value: 10.5,
      options: {},
      expected: '10,5',
    },
    {
      value: 100.5,
      options: {},
      expected: '100,5',
    },
    {
      value: 1000.5,
      options: {},
      expected: '1\xa0000,5',
    },
    {
      value: 10000.5,
      options: {},
      expected: '10\xa0000,5',
    },
    // Float
    {
      value: 1,
      options: {
        minimumFractionDigits: 3,
      },
      expected: '1,000',
    },
    {
      value: 10,
      options: {
        minimumFractionDigits: 3,
      },
      expected: '10,000',
    },
    {
      value: 100,
      options: {
        minimumFractionDigits: 3,
      },
      expected: '100,000',
    },
    {
      value: 1000,
      options: {
        minimumFractionDigits: 3,
      },
      expected: '1\xa0000,000',
    },
    {
      value: 10000,
      options: {
        minimumFractionDigits: 3,
      },
      expected: '10\xa0000,000',
    },
    // Float with minimumFractionDigits
    {
      value: 1.321,
      options: {
        minimumFractionDigits: 3,
      },
      expected: '1,321',
    },
    {
      value: 10.321,
      options: {
        minimumFractionDigits: 3,
      },
      expected: '10,321',
    },
    {
      value: 100.321,
      options: {
        minimumFractionDigits: 3,
      },
      expected: '100,321',
    },
    {
      value: 1000.321,
      options: {
        minimumFractionDigits: 3,
      },
      expected: '1\xa0000,321',
    },
    {
      value: 10000.321,
      options: {
        minimumFractionDigits: 3,
      },
      expected: '10\xa0000,321',
    },
    {
      value: 100,
      options: {
        currency: true,
      },
      expected: '100,00\xa0₽',
    },
  ] as const)('returns correct result for %s number', testcase => {
    expect(NumberFormatter.format(testcase.value, testcase.options)).toStrictEqual(
      testcase.expected,
    );
  });
});
