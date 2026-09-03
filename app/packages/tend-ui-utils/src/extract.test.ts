import { extract } from './extract';

describe('extract', () => {
  describe('when "path" is correct', () => {
    it('returns correct result #1', () => {
      const result = extract(
        {
          a: {
            b: {
              c: 'Hello World',
            },
          },
        },
        ['a', 'b', 'c'],
      );

      expect(result).toBe('Hello World');
    });

    it('returns correct result #2', () => {
      const result = extract(
        {
          a: {
            b: {
              c: 'Hello World',
            },
          },
        },
        ['a', 'b'],
      );

      expect(result).toEqual({
        c: 'Hello World',
      });
    });
  });

  describe('when "path" is not correct', () => {
    it('returns "undefined"', () => {
      const result = extract(
        {
          a: {
            b: {
              c: 'Hello World',
            },
          },
        },
        ['a', 'b', 'c', 'd'],
      );

      expect(result).toBeUndefined();
    });
  });
});
