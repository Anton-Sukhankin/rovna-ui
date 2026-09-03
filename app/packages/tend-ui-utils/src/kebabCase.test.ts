import { kebabCase } from './kebabCase';

describe('kebabCase', () => {
  it('returns correct result', () => {
    expect(kebabCase('marginBottom')).toBe('margin-bottom');
  });
});
