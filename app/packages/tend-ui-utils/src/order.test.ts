import { order } from './order';

const target = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

describe('order', () => {
  it.each([
    {
      sequence: ['b', 'a', 'c'],
      expected: [{ id: 'b' }, { id: 'a' }, { id: 'c' }],
    },
  ])('with given %o returns array with ordered elements', variant => {
    const result = order(target, variant.sequence, 'id');
    expect(result).toEqual(variant.expected);
  });

  it.each([
    {
      sequence: [],
      expected: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
    },
  ])('with given %o returns array with ordered elements', variant => {
    const result = order(target, variant.sequence, 'id');
    expect(result).toEqual(variant.expected);
  });
});
