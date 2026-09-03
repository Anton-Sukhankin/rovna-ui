import { formatBytes } from './formatBytes';

describe('formatBytes', () => {
  it.each([
    [1024, '1.0 kB'],
    [48123, '48 kB'],
    [3412, '3.4 kB'],
    [454912, '455 kB'],
    [3859123, '3.9 MB'],
    [128608, '129 kB'],
  ])('returns correct result', (value, expected) => {
    expect(formatBytes(value)).toBe(expected);
  });
});
