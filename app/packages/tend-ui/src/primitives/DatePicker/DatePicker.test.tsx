import React from 'react';
import dayjs from 'dayjs';
import { fireEvent, render } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { DatePicker } from './DatePicker';

import 'dayjs/locale/ru';

jest.useFakeTimers().setSystemTime(new Date('2023-11-09'));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: unknown) => node,
}));

describe('DatePicker', () => {
  describe('renders correctly', () => {
    it('itself', () => {
      const snap = snapshotWithTheme(<DatePicker />);
      expect(snap).toMatchSnapshot();
    });

    it('opened', () => {
      const snap = snapshotWithTheme(<DatePicker open />);
      expect(snap).toMatchSnapshot();
    });
  });

  describe('with given default "value"', () => {
    it('renders correctly', () => {
      const renderer = render(<DatePicker value={dayjs('08.05.1996')} />);

      expect(renderer.getByTitle(/05.08.1996/)).toBeInTheDocument();

      renderer.rerender(<DatePicker value={dayjs('11.11.2011')} />);

      expect(renderer.getByTitle(/11.11.2011/)).toBeInTheDocument();
    });
  });

  describe('on selecting date', () => {
    it('calls "onChange" callback correctly', () => {
      const onChange = jest.fn();
      const renderer = render(
        <DatePicker open placeholder='Выберите' onChange={onChange} />,
      );

      fireEvent.click(renderer.getByTitle('2023-11-15'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0].format('YYYY-MM-DD')).toBe('2023-11-15');
      expect(onChange.mock.calls[0][1]).toBe('15.11.2023');
    });
  });
});
