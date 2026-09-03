import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { useUpdateLayoutEffect } from './useUpdateLayoutEffect';

describe('useUpdateLayoutEffect', () => {
  it('skips first render correctly', async () => {
    const fn = jest.fn();
    const { rerender } = renderHook(props => useUpdateLayoutEffect(fn, [props]));

    await waitFor(() => {
      expect(fn).not.toHaveBeenCalledTimes(1);
    });

    act(() => {
      rerender(1);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

    act(() => {
      rerender(2);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
