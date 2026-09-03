import { clamp } from './clamp';

describe('clamp', () => {
  it.each([
    { value: -1, min: 1, max: 5, expected: 1 },
    { value: 0, min: 1, max: 5, expected: 1 },
    { value: 1, min: 1, max: 5, expected: 1 },
    { value: 2, min: 1, max: 5, expected: 2 },
    { value: 3, min: 1, max: 5, expected: 3 },
    { value: 4, min: 1, max: 5, expected: 4 },
    { value: 5, min: 1, max: 5, expected: 5 },
    { value: 6, min: 1, max: 5, expected: 5 },
    { value: 7, min: 1, max: 5, expected: 5 },
  ] as const)('returns correct result for %s', testcase => {
    const result = clamp(testcase.value, testcase.min, testcase.max);
    expect(result).toBe(testcase.expected);
  });
});
