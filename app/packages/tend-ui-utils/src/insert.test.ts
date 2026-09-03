import { insert } from './insert';

describe('insert', () => {
  it('inserts new element after finding correctly', () => {
    const result_1 = insert(['1', '2', '3'], '4', value => value === '2');
    expect(result_1).toEqual(['1', '2', '4', '3']);

    const result_2 = insert(['1', '2', '3'], '4', value => value === '1');
    expect(result_2).toEqual(['1', '4', '2', '3']);
  });

  it('does not insert new element if finding element not found', () => {
    const result = insert(['1', '2', '3'], '4', value => value === '5');
    expect(result).toEqual(['1', '2', '3']);
  });
});
