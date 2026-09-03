import { sort } from './sort';

describe('sort', () => {
  it.each([
    { value: { b: '2', a: '1' }, expected: { a: '1', b: '2' } },
    { value: { World: '2', Hello: '1' }, expected: { Hello: '1', World: '2' } },
  ] as const)('sorts object correctly', testcase => {
    const result = sort(testcase.value, ([a], [b]) => a.localeCompare(b));
    expect(result).toEqual(testcase.expected);
  });
});
