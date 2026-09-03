import { act, renderHook } from '@testing-library/react-hooks';

import { useBoolean } from './useBoolean';

describe('useBoolean', () => {
  it('returns correct result', () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current[0]).toBeFalsy();
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  it('sets given value correctly', () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current[0]).toBeFalsy();

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBeTruthy();

    act(() => {
      result.current[1](false);
    });

    expect(result.current[0]).toBeFalsy();
  });

  it('toggles current value correctly', () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current[0]).toBeFalsy();

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBeTruthy();

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBeFalsy();
  });
});
