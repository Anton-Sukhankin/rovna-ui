import { isObject } from './isObject';

function noop() {
  console.log('noop');
}

describe('isObject', () => {
  it.each([
    { value: {}, expected: true },
    { value: [], expected: true },
    { value: noop, expected: true },
    { value: null, expected: false },
    { value: 1703, expected: false },
    { value: 'Hello World', expected: false },
    { value: undefined, expected: false },
    { value: false, expected: false },
    { value: true, expected: false },
  ] as const)('returns correct result %o', variant => {
    const result = isObject(variant.value);
    expect(result).toBe(variant.expected);
  });
});
