import { isExceed } from './isExceed';

describe('isExceed', () => {
  it.each([
    { target: 100, max: 100, percent: 80, expected: true },
    { target: 79, max: 100, percent: 80, expected: false },
    { target: 80, max: 100, percent: 80, expected: true },
    { target: 100, max: 100, percent: 0, expected: true },
    { target: 0.1, max: 100, percent: 1, expected: false },
  ])('returns correct result %s', testcase => {
    const result = isExceed(testcase.target, testcase.max, testcase.percent);
    expect(result).toBe(testcase.expected);
  });
});
