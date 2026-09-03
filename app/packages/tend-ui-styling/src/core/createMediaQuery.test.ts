import { createMediaQuery } from './createMediaQuery';

describe('createMediaQuery', () => {
  it('returns correct result', () => {
    const result = createMediaQuery(1200, 'margin', '0px');
    expect(result.replace(/\s/g, '')).toEqual(
      `
      @media (max-width: 1200px) {
        margin: 0px;
      }
    `.replace(/\s/g, ''),
    );
  });
});
