import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-test-renderer';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Chips } from './Chips';
import { ChipsOption } from './types';

describe('Chips', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <Chips
        options={[
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ]}
      />,
    );
    expect(snap).toMatchSnapshot();

    const snap_2 = snapshotWithTheme(
      <Chips
        value={['Monday', 'Tuesday']}
        options={[
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ]}
      />,
    );
    expect(snap_2).toMatchSnapshot();
  });

  it('triggers "onChange" correctly', () => {
    const onChangeMock = jest.fn();
    const renderer = render(
      <Chips
        onChange={onChangeMock}
        options={[
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ]}
      />,
    );

    fireEvent.click(renderer.getByText(/Monday/));
    fireEvent.click(renderer.getByText(/Friday/));
    fireEvent.click(renderer.getByText(/Sunday/));
    expect(onChangeMock).toHaveBeenCalledWith('Monday', ['Monday']);
    expect(onChangeMock).toHaveBeenCalledWith('Friday', ['Monday', 'Friday']);
    expect(onChangeMock).toHaveBeenCalledWith('Sunday', ['Monday', 'Friday', 'Sunday']);

    fireEvent.click(renderer.getByText(/Monday/));
    expect(onChangeMock).toHaveBeenCalledWith('Monday', ['Friday', 'Sunday']);
  });

  it('controlled triggers "onChange" correctly', () => {
    const onChangeMock = jest.fn();
    const Component = () => {
      const [value, setValue] = React.useState<ChipsOption[]>([]);

      return (
        <Chips
          value={value}
          onChange={(_, v) => {
            onChangeMock(_, v);
            setValue(v);
          }}
          options={[
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ]}
        />
      );
    };

    const renderer = render(<Component />);

    act(() => {
      fireEvent.click(renderer.getByText(/Monday/));
    });

    expect(onChangeMock).toHaveBeenCalledWith('Monday', ['Monday']);

    act(() => {
      fireEvent.click(renderer.getByText(/Friday/));
    });
    expect(onChangeMock).toHaveBeenCalledWith('Friday', ['Monday', 'Friday']);

    act(() => {
      fireEvent.click(renderer.getByText(/Sunday/));
    });

    expect(onChangeMock).toHaveBeenCalledWith('Sunday', ['Monday', 'Friday', 'Sunday']);

    act(() => {
      fireEvent.click(renderer.getByText(/Monday/));
    });
    expect(onChangeMock).toHaveBeenCalledWith('Monday', ['Friday', 'Sunday']);
  });
});
