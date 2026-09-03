import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
  it('returns previous value', async () => {
    const { result, rerender } = renderHook(props => usePrevious(props));

    await waitFor(() => {
      expect(result.current).toBe(undefined);
    });

    act(() => {
      rerender(1);
    });

    await waitFor(() => {
      expect(result.current).toBe(undefined);
    });

    act(() => {
      rerender(2);
    });

    await waitFor(() => {
      expect(result.current).toBe(1);
    });
  });
});
