import { act, renderHook } from '@testing-library/react-hooks';

import { useColumns } from './useColumns';
import { ColumnConfig } from '../types';

describe('useColumns', () => {
  afterEach(() => {
    localStorage.clear();
  });

  const columns = [
    { id: '1', title: 'Column 1' },
    { id: '2', title: 'Column 2' },
    { id: '3', title: 'Column 3' },
  ];
  it('returns correct result', () => {
    const { result } = renderHook(() =>
      useColumns<ColumnConfig>([
        { id: '1', title: 'Column 1' },
        { id: '2', title: 'Column 2' },
        { id: '3', title: 'Column 3' },
      ]),
    );

    expect(result.current[0]).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
    expect(result.current[1].columns).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
    expect(result.current[1].display).toBeInstanceOf(Function);
    expect(result.current[1].reset).toBeInstanceOf(Function);
  });
  describe('when "columns" in parameter changed', () => {
    it('returns "columns" correctly', () => {
      const { result, rerender } = renderHook(props => useColumns<ColumnConfig>(props), {
        initialProps: [
          { id: '1', title: 'Column 1' },
          { id: '2', title: 'Column 2' },
          { id: '3', title: 'Column 3' },
        ],
      });

      expect(result.current[0]).toEqual([
        { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
        { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
        { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      ]);

      rerender([
        { id: '_1', title: 'Column 1' },
        { id: '_2', title: 'Column 2' },
        { id: '_3', title: 'Column 3' },
        { id: '_4', title: 'Column 4' },
      ]);

      expect(result.current[0]).toEqual([
        { id: '_1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
        { id: '_2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
        { id: '_3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
        { id: '_4', title: 'Column 4', visible: true, pinnable: true, draggable: true },
      ]);
    });
  });
  it('changes columns correctly', () => {
    const { result } = renderHook(() => useColumns<ColumnConfig>(columns));

    expect(result.current[0]).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].display?.(false, {
        id: '2',
        title: 'Column 2',
      });
    });

    expect(result.current[0]).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
  });
  it('resets columns to default columns correctly', () => {
    const { result } = renderHook(() => useColumns<ColumnConfig>(columns));

    expect(result.current[0]).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].display?.(false, {
        id: '2',
        title: 'Column 2',
      });
    });

    expect(result.current[0]).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].reset?.();
    });

    expect(result.current[0]).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
  });
  it('sorts columns correctly', () => {
    const { result } = renderHook(() => useColumns<ColumnConfig>(columns));

    expect(result.current[1].columns).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].swap?.(0, 1);
    });

    expect(result.current[1].columns).toEqual([
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    expect(result.current[0]).toEqual([
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
  });
  it('pins column on the left side correctly', () => {
    const { result } = renderHook(() => useColumns<ColumnConfig>(columns));

    expect(result.current[1].columns).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].pin?.('left', { id: '2' });
    });

    expect(result.current[1].columns).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    expect(result.current[0]).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
  });
  it('pins column on the right side correctly', () => {
    const { result } = renderHook(() => useColumns<ColumnConfig>(columns));

    expect(result.current[1].columns).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].pin?.('right', { id: '2' });
    });

    expect(result.current[1].columns).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'right',
      },
    ]);

    expect(result.current[0]).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'right',
      },
    ]);
  });
  it('unpins column and preserves its current position correctly', () => {
    const { result } = renderHook(() => useColumns<ColumnConfig>(columns));

    expect(result.current[1].columns).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].pin?.('left', { id: '2' });
    });

    expect(result.current[1].columns).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    expect(result.current[0]).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].unpin?.({ id: '2' });
    });

    expect(result.current[1].columns).toEqual([
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    expect(result.current[0]).toEqual([
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
  });
  it('unpins column if column has been moved', () => {
    const { result } = renderHook(() => useColumns<ColumnConfig>(columns));

    expect(result.current[1].columns).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].pin?.('left', { id: '2' });
    });

    expect(result.current[1].columns).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    expect(result.current[0]).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].swap(0, 1);
    });

    expect(result.current[1].columns).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    expect(result.current[0]).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
  });
  it('toggles pinning correctly', () => {
    const { result } = renderHook(() => useColumns<ColumnConfig>(columns));

    expect(result.current[1].columns).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].pin?.('left', { id: '2' });
    });

    expect(result.current[1].columns).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    expect(result.current[0]).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].pin('none', { id: '2' });
    });

    expect(result.current[1].columns).toEqual([
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    expect(result.current[0]).toEqual([
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
  });
  it('stacks pinned columns in correct order', () => {
    const { result } = renderHook(() =>
      useColumns<ColumnConfig>([
        { id: '1', title: 'Column 1' },
        { id: '2', title: 'Column 2' },
        { id: '3', title: 'Column 3' },
        { id: '4', title: 'Column 4' },
        { id: '5', title: 'Column 5' },
      ]),
    );

    expect(result.current[1].columns).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      { id: '4', title: 'Column 4', visible: true, pinnable: true, draggable: true },
      { id: '5', title: 'Column 5', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].pin?.('left', { id: '2' });
    });

    expect(result.current[1].columns).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      { id: '4', title: 'Column 4', visible: true, pinnable: true, draggable: true },
      { id: '5', title: 'Column 5', visible: true, pinnable: true, draggable: true },
    ]);

    expect(result.current[0]).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      { id: '4', title: 'Column 4', visible: true, pinnable: true, draggable: true },
      { id: '5', title: 'Column 5', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].pin?.('left', { id: '4' });
    });

    expect(result.current[1].columns).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      {
        id: '4',
        title: 'Column 4',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      { id: '5', title: 'Column 5', visible: true, pinnable: true, draggable: true },
    ]);

    expect(result.current[0]).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      {
        id: '4',
        title: 'Column 4',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      { id: '5', title: 'Column 5', visible: true, pinnable: true, draggable: true },
    ]);

    act(() => {
      result.current[1].pin?.('left', { id: '5' });
    });

    expect(result.current[1].columns).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      {
        id: '4',
        title: 'Column 4',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      {
        id: '5',
        title: 'Column 5',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);

    expect(result.current[0]).toEqual([
      {
        id: '2',
        title: 'Column 2',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      {
        id: '4',
        title: 'Column 4',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      {
        id: '5',
        title: 'Column 5',
        visible: true,
        pinnable: true,
        draggable: true,
        fixed: 'left',
      },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
  });
  it('returns columns from localStorage correctly', () => {
    localStorage.setItem(
      'key',
      JSON.stringify([
        { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
        { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
        { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      ]),
    );

    const { result } = renderHook(() =>
      useColumns<ColumnConfig>({ localStorage: 'key', columns }),
    );

    expect(result.current[0]).toEqual([
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
  });
  it('returns given columns if amount of columns changed ', () => {
    localStorage.setItem(
      'key',
      JSON.stringify([
        { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
        { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      ]),
    );

    const { result } = renderHook(() =>
      useColumns<ColumnConfig>({ localStorage: 'key', columns }),
    );

    expect(result.current[0]).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
  });
  it('returns given columns if id of some columns changed ', () => {
    localStorage.setItem(
      'key',
      JSON.stringify([
        { id: '4', title: 'Column 2', visible: true, pinnable: true, draggable: true },
        { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
        { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      ]),
    );

    const { result } = renderHook(() =>
      useColumns<ColumnConfig>({ localStorage: 'key', columns }),
    );

    expect(result.current[0]).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
  });
});
