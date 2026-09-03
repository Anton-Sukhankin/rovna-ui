import { px } from './px';
import { styling } from './styling';

describe('styling', () => {
  describe('when type "boolean"', () => {
    it('returns correct css', () => {
      const props = {
        $centered: true,
        $align: false,
      };
      const result = styling({
        $centered: {
          type: 'boolean',
          properties: { alignItems: 'center', justifyContent: 'center' },
        },
      })(props);

      expect(result.replace(/\s/g, '')).toEqual(
        'align-items:center;justify-content:center;',
      );
    });
  });

  describe('when type "string"', () => {
    it('returns correct css', () => {
      const props = {
        $marginTop: '24px',
        $paddingBottom: 24,
      };
      const result = styling({
        $marginTop: { type: 'string', properties: ['marginTop'] },
        $paddingBottom: { type: 'string', properties: ['paddingBottom'] },
      })(props);

      expect(result.replace(/\s/g, '')).toEqual('margin-top:24px;padding-bottom:24;');
    });
  });

  describe('with given "transform" function', () => {
    describe('when type "string | number"', () => {
      it('returns correct css', () => {
        const props = {
          $marginTop: 24,
          $opacity: 0,
        };
        const result = styling({
          $marginTop: {
            type: 'string | number',
            properties: ['marginTop'],
            transform: px,
          },
          $opacity: { type: 'string', properties: ['opacity'] },
        })(props);

        expect(result.replace(/\s/g, '')).toEqual('margin-top:24px;opacity:0;');
      });
    });
  });
});
