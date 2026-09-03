import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { useMount } from './useMount';

describe('useMount', () => {
  it('executes callback only ones', async () => {
    const fn = jest.fn();
    const { rerender } = renderHook(() => useMount(fn));

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

    act(() => {
      rerender();
    });

    await waitFor(() => {
      expect(fn).not.toHaveBeenCalledTimes(2);
    });
  });
});
