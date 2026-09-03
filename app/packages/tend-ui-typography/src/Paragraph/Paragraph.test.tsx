import React from 'react';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { Paragraph } from './Paragraph';
import { sizes } from '../types';

describe('Paragraph', () => {
  describe.each(sizes)('%s size', size => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <Paragraph size={size}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, sequi?
        </Paragraph>,
      );
      expect(snap).toMatchSnapshot();
    });

    it('strong renders correctly', () => {
      const snap = snapshotWithTheme(
        <Paragraph strong>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, sequi?
        </Paragraph>,
      );
      expect(snap).toMatchSnapshot();
    });

    it('colored renders correctly', () => {
      const snap = snapshotWithTheme(
        <Paragraph color='red'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, sequi?
        </Paragraph>,
      );
      expect(snap).toMatchSnapshot();
    });

    it('uppercase renders correctly', () => {
      const snap = snapshotWithTheme(
        <Paragraph uppercase>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, sequi?
        </Paragraph>,
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
        <Paragraph {...props} size={size}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, sequi?
        </Paragraph>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
