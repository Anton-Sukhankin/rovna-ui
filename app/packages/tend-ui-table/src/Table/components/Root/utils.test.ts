import { patch } from './utils';

describe('patch', () => {
  it.each([
    {
      previous: { name: 'John' },
      next: { surname: 'Smith', age: 30 },
      expected: { surname: 'Smith', age: 30, name: undefined },
    },
    {
      previous: { name: 'John', surname: 'Snow', age: 10 },
      next: { surname: 'Smith', age: 30 },
      expected: { surname: 'Smith', age: 30, name: undefined },
    },
    {
      previous: { name: 'John', surname: 'Snow' },
      next: { name: 'Will', surname: 'Smith' },
      expected: { name: 'Will', surname: 'Smith' },
    },
    {
      previous: {},
      next: { name: 'Will', surname: 'Smith' },
      expected: { name: 'Will', surname: 'Smith' },
    },
    {
      previous: { age: 40, job: 'IT' },
      next: { name: 'Will', surname: 'Smith' },
      expected: { name: 'Will', surname: 'Smith', age: undefined, job: undefined },
    },
  ] as const)('returns correct result', testcase => {
    const result = patch(testcase.previous, testcase.next);
    expect(result).toStrictEqual(testcase.expected);
  });
  it.each([
    {
      previous: { name: 'default', surname: 'default' },
      next: { name: 'ascend', surname: 'descend' },
      expected: { name: 'ascend', surname: 'descend' },
    },
    {
      previous: { name: 'default', surname: 'default', job: 'ascend' },
      next: { name: 'ascend', surname: 'descend' },
      expected: { name: 'ascend', surname: 'descend', job: 'default' },
    },
    {
      previous: {},
      next: { name: 'ascend', surname: 'descend' },
      expected: { name: 'ascend', surname: 'descend' },
    },
    {
      previous: { job: 'descend' },
      next: { name: 'ascend', surname: 'descend' },
      expected: { name: 'ascend', surname: 'descend', job: 'default' },
    },
  ] as const)('returns correct result', testcase => {
    const result = patch(testcase.previous, testcase.next, 'default');
    expect(result).toStrictEqual(testcase.expected);
  });
});
