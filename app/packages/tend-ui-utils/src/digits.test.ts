import { digits } from './digits';

describe.each([
  { value: 'hello1234world5678,{}""./?', expected: '12345678' },
  { value: 'helloworld', expected: '' },
])('given $value', testcase => {
  it(`should return ${testcase.expected} result correctly`, () => {
    expect(digits(testcase.value)).toBe(testcase.expected);
  });
});
