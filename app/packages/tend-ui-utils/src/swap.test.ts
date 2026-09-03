import { swap } from './swap';

describe('swap', () => {
  it.each([
    {
      from: 0,
      to: 2,
      expected: ['c', 'b', 'a'],
    },
    {
      from: 0,
      to: 0,
      expected: ['a', 'b', 'c'],
    },
    {
      from: 1,
      to: 2,
      expected: ['a', 'c', 'b'],
    },
    {
      from: 1,
      to: 0,
      expected: ['b', 'a', 'c'],
    },
  ])('returns array with swapped elements', variant => {
    const result = swap(['a', 'b', 'c'], variant.from, variant.to);
    expect(result).toEqual(variant.expected);
  });

  it.each([
    {
      from: 0,
      to: 10,
      expected: ['a', 'b', 'c'],
    },
    {
      from: -5,
      to: -5,
      expected: ['a', 'b', 'c'],
    },
    {
      from: -2,
      to: 10,
      expected: ['a', 'b', 'c'],
    },
    {
      from: 1,
      to: 3,
      expected: ['a', 'b', 'c'],
    },
  ])('returns the array if indexes are not valid', variant => {
    const result = swap(['a', 'b', 'c'], variant.from, variant.to);
    expect(result).toEqual(variant.expected);
  });
});
