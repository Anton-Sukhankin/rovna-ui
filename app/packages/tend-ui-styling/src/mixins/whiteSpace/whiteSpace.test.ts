import { whiteSpace } from './whiteSpace';

describe('whiteSpace', () => {
  it.each([
    ['wrap', 'white-space: wrap;'],
    ['pre-wrap', 'white-space: pre-wrap;'],
  ] as const)('returns correct result', (value, expected) => {
    const result = whiteSpace({ $whiteSpace: value });
    expect(result).toBe(expected);
  });
});
