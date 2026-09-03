import { isNumber } from './isNumber';

function noop() {
  console.log('noop');
}

describe('isNumber', () => {
  it.each([
    { value: 1703, expected: true },
    { value: 'Hello World', expected: false },
    { value: {}, expected: false },
    { value: [], expected: false },
    { value: noop, expected: false },
    { value: null, expected: false },
    { value: undefined, expected: false },
    { value: false, expected: false },
    { value: true, expected: false },
  ] as const)('returns correct result', variant => {
    const result = isNumber(variant.value);
    expect(result).toBe(variant.expected);
  });
});
