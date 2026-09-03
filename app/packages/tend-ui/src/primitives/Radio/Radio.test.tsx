import React from 'react';
import { render } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Radio } from './Radio';

describe('Radio', () => {
  it('provides a Russian accessible name when rendered without a label', () => {
    const renderer = render(<Radio />);

    expect(renderer.getByRole('radio')).toHaveAccessibleName('Выбрать вариант');
  });

  it('renders correctly', () => {
    const snap = snapshotWithTheme(<Radio />);
    expect(snap).toMatchSnapshot();
  });

  it('disabled renders correctly', () => {
    const snap = snapshotWithTheme(<Radio disabled />);
    expect(snap).toMatchSnapshot();
  });

  describe('Group', () => {
    it('uses radiogroup semantics for a required group', () => {
      const renderer = render(<Radio.Group aria-required />);

      expect(renderer.getByRole('radiogroup')).toHaveAttribute(
        'aria-required',
        'true',
      );
    });

    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <Radio.Group>
          <Radio value='A'>Каменные материалы</Radio>
          <Radio value='B'>Растворы</Radio>
          <Radio value='C'>Металлы</Radio>
        </Radio.Group>,
      );
      expect(snap).toMatchSnapshot();
    });

    it('as buttons renders correctly', () => {
      const snap = snapshotWithTheme(
        <Radio.Group>
          <Radio.Button value='A'>Каменные материалы</Radio.Button>
          <Radio.Button value='B'>Растворы</Radio.Button>
          <Radio.Button value='C'>Металлы</Radio.Button>
        </Radio.Group>,
      );
      expect(snap).toMatchSnapshot();

      const snap_2 = snapshotWithTheme(
        <Radio.Group
          options={[
            {
              value: 'A',
              label: 'Option 1',
            },
            {
              value: 'B',
              label: 'Option 2',
            },
            {
              value: 'C',
              label: 'Option 3',
            },
          ]}
          optionType='button'
        />,
      );
      expect(snap_2).toMatchSnapshot();
    });

    it('vertical renders correctly', () => {
      const snap = snapshotWithTheme(
        <Radio.Group layout='vertical'>
          <Radio value='A'>Каменные материалы</Radio>
          <Radio value='B'>Растворы</Radio>
          <Radio value='C'>Металлы</Radio>
        </Radio.Group>,
      );
      expect(snap).toMatchSnapshot();
    });
  });
});
