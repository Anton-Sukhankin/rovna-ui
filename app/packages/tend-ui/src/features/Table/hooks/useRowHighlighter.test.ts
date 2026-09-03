import { renderHook } from '@testing-library/react-hooks';

import { useRowHighlighter } from './useRowHighlighter';

describe('useRowHighlighter', () => {
  it('returns correct result', () => {
    const { result } = renderHook(() => useRowHighlighter({}));
    expect(result.current).toBeInstanceOf(Function);
  });

  it('returns correct className with onError callback', () => {
    const { result } = renderHook(() => useRowHighlighter({ onError: () => true }));
    expect(result.current(1)).toBe('rovna-ui-table-row-error');
  });

  it('returns correct className with onWarning callback', () => {
    const { result } = renderHook(() => useRowHighlighter({ onWarning: () => true }));
    expect(result.current(1)).toBe('rovna-ui-table-row-warning');
  });

  it('returns correct className with onSuccess callback', () => {
    const { result } = renderHook(() => useRowHighlighter({ onSuccess: () => true }));
    expect(result.current(1)).toBe('rovna-ui-table-row-success');
  });
});
