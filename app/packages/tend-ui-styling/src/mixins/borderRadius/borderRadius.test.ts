import { borderRadius } from './borderRadius';

describe('borderRadius', () => {
  it.each([
    [4, 'border-radius: 4px;'],
    ['4px', 'border-radius: 4px;'],
  ] as const)('returns correct result', (value, expected) => {
    const result = borderRadius({ $borderRadius: value });
    expect(result).toBe(expected);
  });
});
