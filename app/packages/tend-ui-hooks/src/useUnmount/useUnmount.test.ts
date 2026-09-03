import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { useUnmount } from './useUnmount';

describe('useUnmount', () => {
  it('executes callback only ones', async () => {
    const fn = jest.fn();
    const { rerender, unmount } = renderHook(() => useUnmount(fn));

    await waitFor(() => {
      expect(fn).not.toHaveBeenCalledTimes(1);
    });

    act(() => {
      rerender();
    });

    await waitFor(() => {
      expect(fn).not.toHaveBeenCalledTimes(1);
    });

    act(() => {
      unmount();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
