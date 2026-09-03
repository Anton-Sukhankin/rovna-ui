import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { InputNumber } from './InputNumber';

describe('InputNumber', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(<InputNumber />);
    expect(snap).toMatchSnapshot();
  });

  it('title appears correctly', async () => {
    const renderer = render(<InputNumber />);
    const input = renderer.getByTestId('rovna-ui-input-number');
    fireEvent.change(input, { target: { value: 123 } });
    expect(input).toHaveAttribute('title', '123');
  });

  it('with given BigInt in stringMode renders correctly', () => {
    const renderer = render(<InputNumber stringMode />);
    const input = renderer.getByTestId('rovna-ui-input-number');
    const expectedValue = '99999999999999999999999999';
    fireEvent.change(input, { target: { value: expectedValue } });
    fireEvent.blur(input);
    expect(input).toHaveAttribute('title', expectedValue);
  });
});
