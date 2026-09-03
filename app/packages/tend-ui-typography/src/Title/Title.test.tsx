import React from 'react';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { Title } from './Title';
import { levels } from './types';

describe('Title', () => {
  describe.each(levels)('%s level', level => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<Title level={level}>Title</Title>);
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
        <Title level={level} {...props}>
          Title
        </Title>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
