import nock from 'nock';
import { act, renderHook } from '@testing-library/react-hooks/dom';
import { waitFor } from '@testing-library/react';

import { usePaginationApi } from './usePaginationApi';
import { __CACHE } from '../../CacheManager';

const wait = (time = 0) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

jest.setTimeout(10000);

beforeEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe('usePaginationApi', () => {
  it('returns correct result', () => {
    const api = jest.fn();
    const { result } = renderHook(() => usePaginationApi(api));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.request).toBeInstanceOf(Function);
  });

  describe('with API as a function', () => {
    it('returns "loading" on pending request correctly', async () => {
      const api = jest.fn().mockResolvedValue({ results: 'done' });
      const { result } = renderHook(() => usePaginationApi(api));

      expect(result.current.loading).toBeFalsy();

      act(() => {
        result.current.request();
      });

      await waitFor(async () => {
        expect(result.current.loading).toBeTruthy();
      });
    });
    it('returns correct "data" on fulfilled request', async () => {
      const api = jest.fn().mockResolvedValue({ results: 'done' });
      const { result } = renderHook(() => usePaginationApi(api));

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
      const { result } = renderHook(() => usePaginationApi(api));

      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();
      waitFor(() => {
        expect(result.current.request()).rejects.toBe('error');
      });
      expect(result.current.data).toBeNull();
    });
    describe('and with caching', () => {
      beforeEach(() => {
        jest.clearAllTimers();
      });
      afterEach(() => {
        __CACHE.clear();
      });
      it('executes callback and returns data correctly', async () => {
        const api = jest
          .fn()
          .mockResolvedValueOnce('hello')
          .mockResolvedValueOnce('world');

        const { result } = renderHook(() =>
          usePaginationApi({ fn: api, cache: { key: '1' } }),
        );

        expect(result.current.request()).resolves.toBe('hello');
      });
      it('does not execute api call and returns cached data correctly', async () => {
        const api = jest
          .fn()
          .mockResolvedValueOnce({ results: 'hello' })
          .mockResolvedValueOnce({ results: 'world' });

        // Так как нет нормального способа размонтировать хук в рамках одного теста
        // имитируем кеширование данных путем шеринга кеша между двумя хуками
        const hook_1 = renderHook(() =>
          usePaginationApi({ fn: api, cache: { key: '1' } }),
        );
        const hook_2 = renderHook(() =>
          usePaginationApi({ fn: api, cache: { key: '1' } }),
        );

        waitFor(async () => {
          expect(hook_1.result.current.request()).resolves.toEqual({ results: 'hello' });
        });

        waitFor(() => {
          expect(hook_1.result.current.data).toBe('hello');
        });

        await wait();

        await waitFor(() => {
          expect(hook_2.result.current.request()).resolves.toEqual({ results: 'hello' });
        });

        await waitFor(() => {
          expect(hook_2.result.current.data).toBe('hello');
        });
      });
      it('with given zero cache time executes callback again and returns new data correctly', async () => {
        const api = jest
          .fn()
          .mockResolvedValueOnce('hello')
          .mockResolvedValueOnce('world');

        const { result } = renderHook(() =>
          usePaginationApi({ fn: api, cache: { key: '1', cacheTime: 0 } }),
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
        const api = jest
          .fn()
          .mockResolvedValueOnce('hello')
          .mockResolvedValueOnce('world');

        const { result } = renderHook(() =>
          usePaginationApi({ fn: api, cache: { key: '1', cacheTime: 3000 } }),
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

  describe('with API as a string', () => {
    it('request data correctly', async () => {
      const DOMAIN = 'http://localhost';
      const scope = nock(DOMAIN)
        .get('/some-url/')
        .reply(200, { results: ['Hello', 'World'] });

      const { result } = renderHook(() => usePaginationApi('/some-url/'));

      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();

      await act(async () => {
        result.current.request();
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(['Hello', 'World']);
        expect(result.current.error).toBeNull();
      });

      scope.done();
    });
    it('request next data correctly', async () => {
      const DOMAIN = 'http://localhost';
      const scope_1 = nock(DOMAIN)
        .get('/some-url/')
        .reply(200, {
          next: 'http://localhost/some-url-2/',
          results: ['1', '2'],
        });

      const scope_2 = nock(DOMAIN)
        .get('/some-url-2/')
        .reply(200, {
          next: 'http://localhost/some-url-3/',
          results: ['3', '4'],
        });

      const scope_3 = nock(DOMAIN)
        .get('/some-url-3/')
        .reply(200, {
          results: ['5', '6'],
        });

      const { result } = renderHook(() => usePaginationApi('/some-url/'));

      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();

      await act(async () => {
        result.current.request();
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(['1', '2']);
        expect(result.current.error).toBeNull();
      });

      await act(async () => {
        result.current.next();
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(['1', '2', '3', '4']);
        expect(result.current.error).toBeNull();
      });

      await act(async () => {
        result.current.next();
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(['1', '2', '3', '4', '5', '6']);
        expect(result.current.error).toBeNull();
      });

      scope_1.done();
      scope_2.done();
      scope_3.done();
    });
    it('does not request next data correctly', async () => {
      const DOMAIN = 'http://localhost';
      const scope_1 = nock(DOMAIN)
        .get('/some-url/')
        .reply(200, {
          next: null,
          results: ['1', '2'],
        });

      const { result } = renderHook(() => usePaginationApi('/some-url/'));

      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();

      await act(async () => {
        result.current.request();
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(['1', '2']);
        expect(result.current.error).toBeNull();
      });

      await act(async () => {
        result.current.next();
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(['1', '2']);
        expect(result.current.error).toBeNull();
      });

      scope_1.done();
    });
  });
});
