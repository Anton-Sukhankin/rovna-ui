import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { useDebouncedCallback } from './useDebouncedCallback';

const wait = (time = 0) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

jest.setTimeout(20000);

beforeEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useDebouncedCallback', () => {
  it('returns correct result', () => {
    const mock = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(mock));

    expect(result.current).toBeInstanceOf(Function);
  });

  it('executes callback after default debounce delay', async () => {
    const mock = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(mock));

    act(() => {
      result.current();
    });

    expect(mock).not.toHaveBeenCalled();

    await wait(300);

    expect(mock).toHaveBeenCalled();
  });

  it('executes callback after given debounce delay', async () => {
    const mock = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(mock, { wait: 1000 }));

    act(() => {
      result.current();
    });

    expect(mock).not.toHaveBeenCalled();

    await wait(1500);

    expect(mock).toHaveBeenCalled();
  });

  it('executes callback instantly', async () => {
    const mock = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(mock, false));

    act(() => {
      result.current();
    });

    expect(mock).toHaveBeenCalled();
  });

  it('cancels a pending callback when its owner unmounts', () => {
    jest.useFakeTimers();
    const mock = jest.fn();
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(mock, { wait: 1000 }),
    );

    act(() => {
      result.current();
    });

    unmount();
    act(() => {
      jest.runAllTimers();
    });

    expect(mock).not.toHaveBeenCalled();
  });
});
