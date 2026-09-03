import { isUndefined } from './isUndefined';

function noop() {
  console.log('noop');
}

describe('isUndefined', () => {
  it.each([
    { value: 'Hello World', expected: false },
    { value: 1703, expected: false },
    { value: {}, expected: false },
    { value: [], expected: false },
    { value: noop, expected: false },
    { value: false, expected: false },
    { value: true, expected: false },
    { value: null, expected: false },
    { value: undefined, expected: true },
  ] as const)('returns correct result', variant => {
    const result = isUndefined(variant.value);
    expect(result).toBe(variant.expected);
  });
});
