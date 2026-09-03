import { move } from './move';

describe('move', () => {
  it.each([
    {
      from: 1,
      to: 0,
      expected: ['b', 'a', 'c', 'd', 'e'],
    },
    {
      from: 3,
      to: 0,
      expected: ['d', 'a', 'b', 'c', 'e'],
    },
    {
      from: 0,
      to: 4,
      expected: ['b', 'c', 'd', 'e', 'a'],
    },
    {
      from: 2,
      to: 3,
      expected: ['a', 'b', 'd', 'c', 'e'],
    },
  ])('with given %o returns array with moved elements', variant => {
    const result = move(['a', 'b', 'c', 'd', 'e'], variant.from, variant.to);
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
    const result = move(['a', 'b', 'c'], variant.from, variant.to);
    expect(result).toEqual(variant.expected);
  });
});
