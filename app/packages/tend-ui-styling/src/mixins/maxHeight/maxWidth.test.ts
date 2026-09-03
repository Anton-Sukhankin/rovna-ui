import { maxHeight } from './maxHeight';

describe('maxHeight', () => {
  it.each([
    [4, 'max-height: 4px;'],
    ['4px', 'max-height: 4px;'],
  ] as const)('returns correct result', (value, expected) => {
    const result = maxHeight({ $maxHeight: value });
    expect(result).toBe(expected);
  });
});
