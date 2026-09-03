import { declOfNum } from './utils';

describe('declOfNum', () => {
  const forms = ['день', 'дня', 'дней'];

  it.each([
    [1, 'день'],
    [2, 'дня'],
    [5, 'дней'],
    [11, 'дней'],
    [21, 'день'],
    [22, 'дня'],
    [25, 'дней'],
    [-2, 'дня'],
  ])('returns the correct Russian form for %i', (value, expected) => {
    expect(declOfNum(value, forms)).toBe(expected);
  });

  it('handles zero according to the expectZero option', () => {
    expect(declOfNum(0, forms)).toBe('');
    expect(declOfNum(0, forms, true)).toBe('дней');
  });
});
