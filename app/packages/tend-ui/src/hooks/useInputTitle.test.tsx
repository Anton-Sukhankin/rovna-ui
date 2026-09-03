import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-test-renderer';

import { useInputTitle } from './useInputTitle';

const Demo = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const props = useInputTitle({ onChange });

  return <input data-testid='input' {...props} />;
};

describe('useInputTitle', () => {
  it('returns correct result', () => {
    const onChangeMock = jest.fn();
    const { result } = renderHook(() => useInputTitle({ onChange: onChangeMock }));

    expect(result.current.title).toBe('');
    expect(result.current.onChange).toBeInstanceOf(Function);
  });

  it('sets title property on input correctly', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<Demo onChange={onChangeMock} />);
    const input = getByTestId('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Hello World' } });
    });

    expect(input).toHaveProperty('title', 'Hello World');
  });

  it('calls callback on input change correctly', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<Demo onChange={onChangeMock} />);
    const input = getByTestId('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Hello World' } });
    });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
