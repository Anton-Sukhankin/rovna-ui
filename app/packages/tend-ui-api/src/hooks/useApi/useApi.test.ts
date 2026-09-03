import { act, renderHook } from '@testing-library/react-hooks/dom';
import { waitFor } from '@testing-library/react';

import { useApi } from './useApi';
import { __CACHE } from '../../CacheManager';

const wait = (time = 0) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

jest.setTimeout(10000);

beforeEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe('useApi', () => {
  it('returns correct result', () => {
    const api = jest.fn();
    const { result } = renderHook(() => useApi(api));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.request).toBeInstanceOf(Function);
  });

  describe('with API as a function', () => {
    it('returns "loading" on pending request correctly', async () => {
      const api = jest.fn().mockResolvedValue('done');
      const { result } = renderHook(() => useApi(api));

      expect(result.current.loading).toBeFalsy();

      act(() => {
        result.current.request();
      });

      await waitFor(async () => {
        expect(result.current.loading).toBeTruthy();
      });
    });
    it('returns correct "data" on fulfilled request', async () => {
      const api = jest.fn().mockResolvedValue('done');
      const { result } = renderHook(() => useApi(api));

      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();

      await act(async () => {
        result.current.request();
      });

      await waitFor(() => {
        expect(result.current.data).toBe('done');
        expect(result.current.error).toBeNull();
      });
    });
    it('returns correct "error" on rejected request', async () => {
      const api = jest.fn().mockRejectedValue('error');
      const { result } = renderHook(() => useApi(api));

      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();
      waitFor(() => {
        expect(result.current.request()).rejects.toBe('error');
      });
      expect(result.current.data).toBeNull();
    });
  });

  describe('with caching', () => {
    beforeEach(() => {
      jest.clearAllTimers();
    });
    afterEach(() => {
      __CACHE.clear();
    });
    it('executes callback and returns data correctly', async () => {
      const api = jest.fn().mockResolvedValueOnce('hello').mockResolvedValueOnce('world');

      const { result } = renderHook(() => useApi({ fn: api, cache: { key: '1' } }));

      expect(result.current.request()).resolves.toBe('hello');
    });
    it('does not executes callback and returns cached data correctly', async () => {
      const api = jest.fn().mockResolvedValueOnce('hello').mockResolvedValueOnce('world');

      const { result } = renderHook(() => useApi({ fn: api, cache: { key: '1' } }));

      waitFor(async () => {
        expect(result.current.request()).resolves.toBe('hello');
      });

      await wait();

      await waitFor(() => {
        expect(result.current.request()).resolves.toBe('hello');
      });
    });
    it('with given zero cache time executes callback again and returns new data correctly', async () => {
      const api = jest.fn().mockResolvedValueOnce('hello').mockResolvedValueOnce('world');

      const { result } = renderHook(() =>
        useApi({ fn: api, cache: { key: '1', cacheTime: 0 } }),
      );

      await waitFor(() => {
        expect(result.current.request()).resolves.toBe('hello');
      });
      await wait(2000);
      await waitFor(() => {
        expect(result.current.request()).resolves.toBe('world');
      });
    });
    it('after cache time expiring executes callback again and returns new data correctly', async () => {
      const api = jest.fn().mockResolvedValueOnce('hello').mockResolvedValueOnce('world');

      const { result } = renderHook(() =>
        useApi({ fn: api, cache: { key: '1', cacheTime: 3000 } }),
      );

      await waitFor(() => {
        expect(result.current.request()).resolves.toBe('hello');
      });
      await wait(1000);
      await waitFor(() => {
        expect(result.current.request()).resolves.toBe('hello');
      });
      await wait(5000);
      await waitFor(() => {
        expect(result.current.request()).resolves.toBe('world');
      });
    });
  });
});
