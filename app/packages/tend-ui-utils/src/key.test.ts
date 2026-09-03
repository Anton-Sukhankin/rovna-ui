import { key } from './key';

describe('key', () => {
  it.each([
    { obj: { a: 1, b: 2, c: 3, d: 'Hello World' }, value: 1, expected: 'a' },
    { obj: { a: 1, b: 2, c: 3, d: 'Hello World' }, value: 2, expected: 'b' },
    { obj: { a: 1, b: 2, c: 3, d: 'Hello World' }, value: 3, expected: 'c' },
    { obj: { a: 1, b: 2, c: 3, d: 'Hello World' }, value: 'Hello World', expected: 'd' },
  ] as const)('returns correct result', testcase => {
    const result = key(testcase.obj, testcase.value);
    expect(result).toBe(testcase.expected);
  });
});
