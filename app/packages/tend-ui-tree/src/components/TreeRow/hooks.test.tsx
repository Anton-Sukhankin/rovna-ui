import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useDoubleClick } from './hooks';

const event = {} as React.MouseEvent<HTMLElement>;

describe('useDoubleClick', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('delays a single-click callback', () => {
    const onClick = jest.fn();
    const { result } = renderHook(() => useDoubleClick({ onClick, delay: 300 }));

    act(() => {
      result.current(event);
    });

    expect(onClick).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(event);
  });

  it('cancels the single-click callback when a double click occurs', () => {
    const onClick = jest.fn();
    const onDoubleClick = jest.fn();
    const { result } = renderHook(() =>
      useDoubleClick({ onClick, onDoubleClick, delay: 300 }),
    );

    act(() => {
      result.current(event);
      result.current(event);
      jest.advanceTimersByTime(300);
    });

    expect(onClick).not.toHaveBeenCalled();
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
    expect(onDoubleClick).toHaveBeenCalledWith(event);
  });

  it('cancels a pending single click when its owner unmounts', () => {
    const onClick = jest.fn();
    const { result, unmount } = renderHook(() =>
      useDoubleClick({ onClick, delay: 300 }),
    );

    act(() => {
      result.current(event);
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(onClick).not.toHaveBeenCalled();
  });
});
