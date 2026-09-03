import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { UNSTABLE_InputNumber as InputNumber } from './InputNumber';

describe('InputNumber', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(<InputNumber placeholder='Введите число' />);
    expect(snap).toMatchSnapshot();
  });

  describe('when number is typed', () => {
    it('should call "onChange" correctly', () => {
      const onChange = jest.fn();
      const renderer = render(
        <InputNumber placeholder='Введите число' onChange={onChange} />,
      );

      act(() => {
        fireEvent.change(renderer.getByTestId('rovna-ui-input-number'), {
          target: { value: '100500' },
        });
      });

      expect(onChange).toHaveBeenLastCalledWith(100500);
    });

    describe('and cleared', () => {
      it('should call "onChange" with null correctly', () => {
        const onChange = jest.fn();
        const renderer = render(
          <InputNumber placeholder='Введите число' onChange={onChange} />,
        );

        act(() => {
          fireEvent.change(renderer.getByTestId('rovna-ui-input-number'), {
            target: { value: '100500' },
          });
        });

        expect(onChange).toHaveBeenLastCalledWith(100500);

        act(() => {
          fireEvent.change(renderer.getByTestId('rovna-ui-input-number'), {
            target: { value: '' },
          });
        });

        expect(onChange).toHaveBeenLastCalledWith(null);
      });
    });
  });

  describe('when letters are typed', () => {
    it('should call "onChange" correctly', () => {
      const onChange = jest.fn();
      const renderer = render(
        <InputNumber placeholder='Введите число' onChange={onChange} />,
      );

      act(() => {
        fireEvent.change(renderer.getByTestId('rovna-ui-input-number'), {
          target: { value: 'Hello World' },
        });
      });

      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
