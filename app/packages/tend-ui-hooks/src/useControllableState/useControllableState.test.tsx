import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent, render, waitFor } from '@testing-library/react';

import {
  useControllableState,
  UNSTABLE_useControllableStateV2 as useControllableStateV2,
} from './useControllableState';

describe('useControllableState', () => {
  describe('in uncontrolled mode', () => {
    it('returns correct result', async () => {
      const { result } = renderHook(() => useControllableState({ defaultValue: 1 }));

      expect(result.current[0]).toBe(1);

      act(() => {
        result.current[1](2);
      });

      await waitFor(() => {
        expect(result.current[0]).toBe(2);
      });

      act(() => {
        result.current[1]((prev = 0) => prev + 1);
      });

      await waitFor(() => {
        expect(result.current[0]).toBe(3);
      });
    });
  });
  describe('in controlled mode', () => {
    it('returns correct result', async () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => useControllableState({ value: 1, onChange }));

      expect(result.current[0]).toBe(1);

      act(() => {
        result.current[1](2);
      });

      await waitFor(() => {
        expect(result.current[0]).toBe(1);
        expect(onChange).toHaveBeenLastCalledWith(2);
      });

      act(() => {
        result.current[1]((prev = 0) => prev + 1);
      });

      await waitFor(() => {
        expect(result.current[0]).toBe(1);
        expect(onChange).toHaveBeenLastCalledWith(2);
      });
    });
    describe('when parameters are not given', () => {
      it('does not set "undefined" when "value" is changed externally', async () => {
        const onChange = jest.fn();
        const { result, rerender } = renderHook(() =>
          useControllableState<number>({ onChange }),
        );

        expect(result.current[0]).toBe(undefined);

        act(() => {
          result.current[1](1);
        });

        await waitFor(() => {
          expect(result.current[0]).toBe(1);
          expect(onChange).toHaveBeenLastCalledWith(1);
        });

        rerender({ value: undefined });

        await waitFor(() => {
          expect(onChange).not.toHaveBeenLastCalledWith(undefined);
          expect(result.current[0]).toBe(1);
        });
      });
    });
    describe('when parameters are given', () => {
      // TODO: Реализовать логику под тест
      it.failing('sets state when "value" is changed externally', async () => {
        const onChange = jest.fn();
        const { result, rerender } = renderHook(() =>
          useControllableState<number>({ value: 1, onChange }),
        );

        expect(result.current[0]).toBe(1);

        act(() => {
          result.current[1](2);
        });

        await waitFor(() => {
          expect(result.current[0]).toBe(1);
          expect(onChange).toHaveBeenLastCalledWith(2);
        });

        rerender({ value: undefined, onChange });

        await waitFor(() => {
          expect(onChange).not.toHaveBeenLastCalledWith(undefined);
          expect(result.current[0]).toBe(undefined);
        });
      });
    });
  });
});

describe('UNSTABLE_useControllableState', () => {
  describe('in uncontrolled mode', () => {
    it('returns correct result', async () => {
      const { result } = renderHook(() => useControllableStateV2({ defaultValue: 1 }));

      await waitFor(() => {
        expect(result.current[0]).toBe(1);
      });

      act(() => {
        result.current[1](2);
      });

      await waitFor(() => {
        expect(result.current[0]).toBe(2);
      });

      act(() => {
        result.current[1]((prev = 0) => prev + 1);
      });

      await waitFor(() => {
        expect(result.current[0]).toBe(3);
      });
    });
  });
  describe('in controlled mode', () => {
    it('returns correct result #1', async () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => useControllableStateV2({ value: 1, onChange }));

      await waitFor(() => {
        expect(result.current[0]).toBe(1);
      });

      act(() => {
        result.current[1](2);
      });

      await waitFor(() => {
        expect(result.current[0]).toBe(1);
        expect(onChange).toHaveBeenLastCalledWith(2);
      });

      act(() => {
        result.current[1]((prev = 0) => prev + 1);
      });

      await waitFor(() => {
        expect(result.current[0]).toBe(1);
        expect(onChange).toHaveBeenLastCalledWith(2);
      });
    });
    it('returns correct result #2', async () => {
      const onChange = jest.fn();
      const Component = () => {
        const [state, setState] = useControllableStateV2({
          defaultValue: ['Hello'],
          onChange,
        });

        return (
          <div>
            <button
              onClick={() =>
                setState((p = []) => {
                  return [...p, 'World'];
                })
              }
            >
              Add
            </button>
            <span>{state?.[0]}</span>
            <span>{state?.[1]}</span>
          </div>
        );
      };

      const renderer = render(<Component />);
      expect(renderer.getByText(/Hello/)).toBeInTheDocument();

      act(() => {
        fireEvent.click(renderer.getByText(/Add/));
      });

      await waitFor(() => {
        expect(renderer.getByText(/Hello/)).toBeInTheDocument();
        expect(renderer.getByText(/World/)).toBeInTheDocument();
      });
    });
    describe('when parameters are not given', () => {
      it('does not set "undefined" when "value" is changed externally', async () => {
        const onChange = jest.fn();
        const { result, rerender } = renderHook((props: object) =>
          useControllableStateV2<number>({ ...props, onChange }),
        );

        expect(result.current[0]).toBe(undefined);

        act(() => {
          result.current[1](1);
        });

        await waitFor(() => {
          expect(result.current[0]).toBe(1);
          expect(onChange).toHaveBeenLastCalledWith(1);
        });

        rerender({ value: undefined });

        await waitFor(() => {
          expect(onChange).not.toHaveBeenLastCalledWith(undefined);
          expect(result.current[0]).toBe(1);
        });
      });
    });
    describe('when parameters are given', () => {
      it('sets state when "value" is changed externally', async () => {
        const onChange = jest.fn();
        const { result, rerender } = renderHook((props: object) =>
          useControllableStateV2<number>({ value: 1, ...props, onChange }),
        );

        expect(result.current[0]).toBe(1);

        act(() => {
          result.current[1](2);
        });

        await waitFor(() => {
          expect(result.current[0]).toBe(1);
          expect(onChange).toHaveBeenLastCalledWith(2);
        });

        rerender({ value: 100, onChange });

        await waitFor(() => {
          expect(onChange).not.toHaveBeenLastCalledWith(100);
          expect(result.current[0]).toBe(100);
        });
      });
    });
  });
});
