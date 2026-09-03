import { camelCase } from './camelCase';

describe('camelCase', () => {
  it('returns correct result', () => {
    expect(camelCase('margin-bottom')).toBe('marginBottom');
  });
});
