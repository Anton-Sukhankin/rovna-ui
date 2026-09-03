import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(<Input />);
    expect(snap).toMatchSnapshot();
  });

  it('title appears correctly', async () => {
    const renderer = render(<Input />);
    const input = renderer.getByTestId('rovna-ui-input');
    fireEvent.change(input, { target: { value: 'Hello World' } });
    expect(input).toHaveAttribute('title', 'Hello World');
  });

  it('provides a Russian accessible name for the clear button', () => {
    const renderer = render(<Input allowClear defaultValue='Значение' />);

    expect(renderer.getByRole('button', { name: 'Очистить' })).toBeInTheDocument();
  });

  describe.each([
    ['margin', 16],
    ['margin', '16px'],
    ['mt', 16],
    ['mt', '16px'],
    ['mr', 16],
    ['mr', '16px'],
    ['mb', 16],
    ['mb', '16px'],
    ['ml', 16],
    ['ml', '16px'],
  ] as const)('and has %s property ', (property, value) => {
    it('renders correctly', () => {
      const props = {
        [property]: value,
      };

      const snap = snapshotWithTheme(<Input {...props} />);
      expect(snap).toMatchSnapshot();
    });
  });
});
