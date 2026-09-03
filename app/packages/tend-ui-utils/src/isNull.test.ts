import { isNull } from './isNull';

function noop() {
  console.log('noop');
}

describe('isNull', () => {
  it.each([
    { value: null, expected: true },
    { value: 1703, expected: false },
    { value: 'Hello World', expected: false },
    { value: {}, expected: false },
    { value: [], expected: false },
    { value: noop, expected: false },
    { value: undefined, expected: false },
    { value: false, expected: false },
    { value: true, expected: false },
  ] as const)('returns correct result', variant => {
    const result = isNull(variant.value);
    expect(result).toBe(variant.expected);
  });
});
