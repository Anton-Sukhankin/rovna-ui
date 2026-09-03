import { contextFactory } from './contextFactory';

describe('contextFactory', () => {
  it('returns correct result', () => {
    const [Context, useContext] = contextFactory<number>();
    expect(Context).toBeInstanceOf(Object);
    expect(useContext).toBeInstanceOf(Function);
  });
});
