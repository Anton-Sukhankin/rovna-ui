import React from 'react';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { Text } from './Text';
import { sizes } from '../types';

describe('Text', () => {
  describe.each(sizes)('when "size" is %s', size => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <Text size={size}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, sequi?
        </Text>,
      );
      expect(snap).toMatchSnapshot();
    });

    describe('and "color" has value', () => {
      it('renders correctly', () => {
        const snap = snapshotWithTheme(
          <Text color='red'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, sequi?
          </Text>,
        );
        expect(snap).toMatchSnapshot();
      });
    });

    describe.each(['left', 'right'] as const)('and "textAlign" is %s', textAlign => {
      it('renders correctly', () => {
        const snap = snapshotWithTheme(
          <Text textAlign={textAlign}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, sequi?
          </Text>,
        );
        expect(snap).toMatchSnapshot();
      });
    });

    describe.each([100, 200, 300, 400, 500, 600] as const)(
      'and "fontWeight" is %s',
      fontWeight => {
        it('renders correctly', () => {
          const snap = snapshotWithTheme(
            <Text fontWeight={fontWeight}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, sequi?
            </Text>,
          );
          expect(snap).toMatchSnapshot();
        });
      },
    );

    it('uppercase renders correctly', () => {
      const snap = snapshotWithTheme(
        <Text uppercase>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, sequi?
        </Text>,
      );
      expect(snap).toMatchSnapshot();
    });

    it.each([
      ['margin', 12],
      ['margin', '12px'],
      ['mt', 16],
      ['mt', '16px'],
      ['mr', 16],
      ['mr', '16px'],
      ['mb', 16],
      ['mb', '16px'],
      ['ml', 16],
      ['ml', '16px'],
    ])('with custom margin renders correctly', (property, value) => {
      const props = {
        [property]: value,
      };
      const snap = snapshotWithTheme(
        <Text {...props} size={size}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, sequi?
        </Text>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
