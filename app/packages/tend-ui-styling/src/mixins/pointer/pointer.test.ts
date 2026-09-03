import { pointer } from './pointer';

describe('pointer', () => {
  it.each([
    [true, 'cursor: pointer;'],
    [false, ''],
    [undefined, ''],
  ] as const)('returns correct result', (value, expected) => {
    const result = pointer({ $pointer: value });
    expect(result).toBe(expected);
  });
});
