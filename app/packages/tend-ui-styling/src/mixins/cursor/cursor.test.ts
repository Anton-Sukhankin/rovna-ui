import { cursor } from './cursor';

describe('cursor', () => {
  it.each([
    ['pointer', 'cursor: pointer;'],
    ['none', 'cursor: none;'],
  ] as const)('returns correct result', (value, expected) => {
    const result = cursor({ $cursor: value });
    expect(result).toBe(expected);
  });
});
