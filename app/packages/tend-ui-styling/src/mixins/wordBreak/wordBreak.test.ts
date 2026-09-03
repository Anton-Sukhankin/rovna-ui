import { wordBreak } from './wordBreak';

describe('wordBreak', () => {
  it.each([
    ['break-word', 'word-break: break-word;'],
    ['none', 'word-break: none;'],
  ] as const)('returns correct result', (value, expected) => {
    const result = wordBreak({ $wordBreak: value });
    expect(result).toBe(expected);
  });
});
