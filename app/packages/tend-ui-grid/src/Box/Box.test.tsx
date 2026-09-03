import React from 'react';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { Box } from './styled';

describe('Box', () => {
  it('with "as" property renders correctly', () => {
    const snap = snapshotWithTheme(<Box as='span'>Children</Box>);
    expect(snap).toMatchSnapshot();
  });

  it('responsive object renders correctly', () => {
    const snap = snapshotWithTheme(
      <Box $color={{ md: 'red', lg: 'blue' }}>Children</Box>,
    );
    expect(snap).toMatchSnapshot();
  });

  describe.each([
    ['$margin', 12],
    ['$margin', '12px'],
    ['$mt', 16],
    ['$mt', '16px'],
    ['$mr', 16],
    ['$mr', '16px'],
    ['$mb', 16],
    ['$mb', '16px'],
    ['$ml', 16],
    ['$ml', '16px'],
  ] as const)('%s property', (property, value) => {
    it('renders correctly', () => {
      const props = {
        [property]: value,
      };
      const snap = snapshotWithTheme(<Box {...props}>Children</Box>);
      expect(snap).toMatchSnapshot();
    });
  });

  describe.each([
    ['$padding', 12],
    ['$padding', '12px'],
    ['$pt', 16],
    ['$pt', '16px'],
    ['$pr', 16],
    ['$pr', '16px'],
    ['$pb', 16],
    ['$pb', '16px'],
    ['$pl', 16],
    ['$pl', '16px'],
  ] as const)('%s property', (property, value) => {
    it('renders correctly', () => {
      const props = {
        [property]: value,
      };
      const snap = snapshotWithTheme(<Box {...props}>Children</Box>);
      expect(snap).toMatchSnapshot();
    });
  });

  describe('layout properties', () => {
    describe.each([
      ['$display', 'flex'],
      ['$gridTemplateColumns', '1fr 1fr'],
      ['$gridTemplateRows', '1fr 1fr 1fr'],
      ['$rowGap', 2],
      ['$rowGap', '2px'],
      ['$columnGap', 3],
      ['$columnGap', '3px'],
      ['$opacity', '0'],
      ['$opacity', 0],
      ['$alignItems', 'flex-start'],
      ['$flexDirection', 'column'],
      ['$flex', '1'],
      ['$flex', 1],
      ['$flexWrap', 'wrap'],
      ['$flexShrink', 'none'],
      ['$flexGrow', 'grow'],
      ['$justifyContent', 'center'],
      ['$position', 'relative'],
      ['$width', '100px'],
      ['$width', 100],
      ['$height', '100px'],
      ['$height', 100],
      ['$minWidth', '100px'],
      ['$minWidth', 100],
      ['$minHeight', '100px'],
      ['$minHeight', 100],
      ['$maxWidth', '100px'],
      ['$maxWidth', 100],
      ['$maxHeight', '100px'],
      ['$maxHeight', 100],
      ['$top', '10px'],
      ['$top', 10],
      ['$right', '20px'],
      ['$right', 20],
      ['$bottom', '30px'],
      ['$bottom', 30],
      ['$left', '40px'],
      ['$left', 40],
      ['$gap', '8px'],
      ['$gap', 8],
      ['$zIndex', '99'],
      ['$zIndex', 99],
    ] as const)('%s property', (property, value) => {
      it('renders correctly', () => {
        const props = {
          [property]: value,
        };

        const snap = snapshotWithTheme(<Box {...props}>Children</Box>);
        expect(snap).toMatchSnapshot();
      });
    });
  });

  describe('appearance properties', () => {
    it.each([
      ['$color', 'red'],
      ['$backgroundColor', 'blue'],
    ] as const)('%s property', (property, value) => {
      const props = {
        [property]: value,
      };
      const snap = snapshotWithTheme(<Box {...props}>Children</Box>);
      expect(snap).toMatchSnapshot();
    });
  });

  describe('when "undefined" value', () => {
    it.each([
      ['$padding', undefined],
      ['$pl', undefined],
      ['$margin', undefined],
      ['$alignItems', undefined],
      ['$flexDirection', 'column'],
    ])('in %s property skips it correctly', (property, value) => {
      const props = {
        [property]: value,
      };

      const snap = snapshotWithTheme(<Box {...props}>Children</Box>);
      expect(snap).toMatchSnapshot();
    });
  });
});
