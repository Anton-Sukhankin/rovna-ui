import { isBoolean } from './isBoolean';

function noop() {
  console.log('noop');
}

describe('isBoolean', () => {
  it.each([
    { value: 'Hello World', expected: false },
    { value: 1703, expected: false },
    { value: {}, expected: false },
    { value: [], expected: false },
    { value: noop, expected: false },
    { value: null, expected: false },
    { value: undefined, expected: false },
    { value: false, expected: true },
    { value: true, expected: true },
  ] as const)('returns correct result', variant => {
    const result = isBoolean(variant.value);
    expect(result).toBe(variant.expected);
  });
});
