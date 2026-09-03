import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { useEffectOnce } from './useEffectOnce';

describe('useEffectOnce', () => {
  it('executes callback only ones', async () => {
    const fn = jest.fn();
    const { rerender } = renderHook(() => useEffectOnce(fn));

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
