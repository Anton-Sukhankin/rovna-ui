import { maxWidth } from './maxWidth';

describe('maxWidth', () => {
  it.each([
    [4, 'max-width: 4px;'],
    ['4px', 'max-width: 4px;'],
  ] as const)('returns correct result', (value, expected) => {
    const result = maxWidth({ $maxWidth: value });
    expect(result).toBe(expected);
  });
});
