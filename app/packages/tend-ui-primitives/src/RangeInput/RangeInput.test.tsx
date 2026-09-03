import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import { RangeInput } from './RangeInput';

describe('RangeInput', () => {
  it('provides accessible names for both range fields', () => {
    const renderer = render(<RangeInput />);

    expect(renderer.getByLabelText('Начало диапазона')).toBeInTheDocument();
    expect(renderer.getByLabelText('Конец диапазона')).toBeInTheDocument();
  });

  it('supports custom accessible names', () => {
    const renderer = render(<RangeInput ariaLabels={['Минимум', 'Максимум']} />);

    expect(renderer.getByLabelText('Минимум')).toBeInTheDocument();
    expect(renderer.getByLabelText('Максимум')).toBeInTheDocument();
  });

  describe('when input is typed', () => {
    it('executes "onChange" callback correctly', () => {
      const onChange = jest.fn();
      const renderer = render(<RangeInput onChange={onChange} />);

      act(() => {
        fireEvent.change(renderer.getByTestId('rovna-ui-range-input-from'), {
          target: { value: '100' },
        });
      });

      expect(onChange).toHaveBeenLastCalledWith([100, null]);

      act(() => {
        fireEvent.change(renderer.getByTestId('rovna-ui-range-input-to'), {
          target: { value: '200' },
        });
      });

      expect(onChange).toHaveBeenLastCalledWith([100, 200]);
    });
  });
});
