import { renderHook } from '@testing-library/react-hooks';

import { useClient } from './ApiClient';

describe('useClient', () => {
  it('returns correct result', () => {
    const result = renderHook(() => useClient());
    expect(result.result.current.get).toBeInstanceOf(Function);
  });
});
