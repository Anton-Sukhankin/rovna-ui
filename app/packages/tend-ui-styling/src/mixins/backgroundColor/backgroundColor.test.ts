import { backgroundColor } from './backgroundColor';

describe('backgroundColor', () => {
  it.each([
    ['red', 'background-color: red;'],
    ['#ffffff', 'background-color: #ffffff;'],
  ] as const)('returns correct result', (value, expected) => {
    const result = backgroundColor({ $backgroundColor: value });
    expect(result).toBe(expected);
  });
});
