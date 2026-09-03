import { act, renderHook } from '@testing-library/react-hooks/dom';
import { waitFor } from '@testing-library/react';

import { usePostApi } from './usePostApi';

// Мокаем axios клиент
const mockClient = {
  post: jest.fn(),
};

// Мокаем useClient хук
jest.mock('../../context', () => ({
  useClient: () => mockClient,
}));

jest.setTimeout(10000);

beforeEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe('usePostApi', () => {
  it('returns correct initial state', () => {
    const { result } = renderHook(() => usePostApi('/api/test'));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.request).toBeInstanceOf(Function);
  });

  describe('with successful request', () => {
    it('returns "loading" on pending request correctly', async () => {
      mockClient.post.mockResolvedValueOnce({ id: 1, name: 'Test' });
      const { result } = renderHook(() => usePostApi('/api/test'));

      expect(result.current.loading).toBeFalsy();

      act(() => {
        result.current.request({ name: 'Test' });
      });

      await waitFor(async () => {
        expect(result.current.loading).toBeTruthy();
      });
    });

    it('returns correct "data" on fulfilled request', async () => {
      const mockResponse = { id: 1, name: 'Test User' };
      mockClient.post.mockResolvedValueOnce(mockResponse);
      const { result } = renderHook(() => usePostApi('/api/test'));

      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();

      await act(async () => {
        await result.current.request({ name: 'Test User' });
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockResponse);
        expect(result.current.error).toBeNull();
        expect(result.current.loading).toBeFalsy();
      });
    });

    it('calls client.post with correct parameters', async () => {
      const mockResponse = { id: 1, name: 'Test User' };
      mockClient.post.mockResolvedValueOnce(mockResponse);
      const { result } = renderHook(() => usePostApi('/api/users'));

      const testData = { name: 'Test User', email: 'test@example.com' };
      const testConfig = { headers: { 'Content-Type': 'application/json' } };

      await act(async () => {
        await result.current.request(testData, testConfig);
      });

      expect(mockClient.post).toHaveBeenCalledWith('/api/users', testData, testConfig);
    });
  });

  describe('with failed request', () => {
    it('returns correct "error" on rejected request', async () => {
      const mockError = new Error('Network error');
      mockClient.post.mockRejectedValueOnce(mockError);
      const { result } = renderHook(() => usePostApi('/api/test'));

      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();

      await act(async () => {
        try {
          await result.current.request({ name: 'Test' });
        } catch (error) {
          // Ожидаем ошибку
        }
      });

      await waitFor(() => {
        expect(result.current.error).toEqual(mockError);
        expect(result.current.data).toBeNull();
        expect(result.current.loading).toBeFalsy();
      });
    });

    it('throws error when request fails', async () => {
      const mockError = new Error('Server error');
      mockClient.post.mockRejectedValueOnce(mockError);
      const { result } = renderHook(() => usePostApi('/api/test'));

      await act(async () => {
        await expect(result.current.request({ name: 'Test' })).rejects.toThrow(
          'Server error',
        );
      });
    });
  });

  describe('with different data types', () => {
    it('handles FormData correctly', async () => {
      const mockResponse = { success: true };
      mockClient.post.mockResolvedValueOnce(mockResponse);
      const { result } = renderHook(() => usePostApi('/api/upload'));

      const formData = new FormData();
      formData.append('file', new File(['test'], 'test.txt'));

      await act(async () => {
        await result.current.request(formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      });

      expect(mockClient.post).toHaveBeenCalledWith('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    });

    it('handles empty data correctly', async () => {
      const mockResponse = { success: true };
      mockClient.post.mockResolvedValueOnce(mockResponse);
      const { result } = renderHook(() => usePostApi('/api/test'));

      await act(async () => {
        await result.current.request();
      });

      expect(mockClient.post).toHaveBeenCalledWith('/api/test', undefined, undefined);
    });
  });

  describe('with multiple requests', () => {
    it('handles multiple sequential requests correctly', async () => {
      const mockResponse1 = { id: 1, name: 'User 1' };
      const mockResponse2 = { id: 2, name: 'User 2' };

      mockClient.post
        .mockResolvedValueOnce(mockResponse1)
        .mockResolvedValueOnce(mockResponse2);

      const { result } = renderHook(() => usePostApi('/api/users'));

      // Первый запрос
      await act(async () => {
        await result.current.request({ name: 'User 1' });
      });

      expect(result.current.data).toEqual(mockResponse1);

      // Второй запрос
      await act(async () => {
        await result.current.request({ name: 'User 2' });
      });

      expect(result.current.data).toEqual(mockResponse2);
      expect(mockClient.post).toHaveBeenCalledTimes(2);
    });
  });
});
