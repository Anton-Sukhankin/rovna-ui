import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';

import { useMap } from './useMap';

describe('useMap', () => {
  it('returns correct result', () => {
    const { result } = renderHook(() => useMap());

    expect(result.current.set).toBeInstanceOf(Function);
    expect(result.current.get).toBeInstanceOf(Function);
    expect(result.current.del).toBeInstanceOf(Function);
  });

  it('sets and gets value correctly', () => {
    const { result } = renderHook(() => useMap());
    result.current.set('key', 'hello world');
    expect(result.current.get<string>('key')).toBe('hello world');
  });

  it('sets and deletes value correctly', () => {
    const { result } = renderHook(() => useMap());

    act(() => {
      result.current.set('key', 'hello world');
    });

    expect(result.current.get<string>('key')).toBe('hello world');
    const deleted = result.current.del('key');
    expect(deleted).toBe('hello world');
    expect(result.current.get<string>('key')).toBeUndefined();
  });
});
