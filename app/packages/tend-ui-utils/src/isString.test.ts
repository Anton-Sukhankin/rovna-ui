import { isString } from './isString';

function noop() {
  console.log('noop');
}

describe('isString', () => {
  it.each([
    { value: 'Hello World', expected: true },
    { value: 1703, expected: false },
    { value: {}, expected: false },
    { value: [], expected: false },
    { value: noop, expected: false },
    { value: false, expected: false },
    { value: true, expected: false },
    { value: null, expected: false },
    { value: undefined, expected: false },
  ] as const)('returns correct result', variant => {
    const result = isString(variant.value);
    expect(result).toBe(variant.expected);
  });
});
