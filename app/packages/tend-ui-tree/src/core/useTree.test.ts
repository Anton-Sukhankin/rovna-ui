import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { TreeNode } from '../core';
import { useTree } from './useTree';

let defaultNodes: TreeNode[] = [];

beforeEach(() => {
  defaultNodes = [
    {
      key: '1',
      value: 'Node 1',
      children: [
        { key: '2', value: 'Node 2', children: [{ key: '3', value: 'Node 3' }] },
      ],
    },
  ];
});

describe('useTree', () => {
  it('returns initial "nodes" correctly', () => {
    const { result } = renderHook(() => useTree({ defaultNodes }));
    expect(result.current.nodes).toEqual(defaultNodes);
  });
  it('adds new node correctly', () => {
    const onAdd = jest.fn();
    const { result } = renderHook(() => useTree({ defaultNodes, onAdd }));

    act(() => {
      result.current.add('1', { key: '4', value: 'Node 4' });
    });

    waitFor(() => {
      expect(result.current.nodes).toEqual([
        {
          key: '1',
          value: 'Node 1',
          children: [
            { key: '2', value: 'Node 2', children: [{ key: '3', value: 'Node 3' }] },
            { key: '4', value: 'Node 4' },
          ],
        },
      ]);
    });

    waitFor(() => {
      expect(onAdd).toHaveBeenLastCalledWith({ key: '4', value: 'Node 4' });
    });
  });
  it('removes node correctly', () => {
    const onRemove = jest.fn();
    const { result } = renderHook(() => useTree({ defaultNodes, onRemove }));

    act(() => {
      result.current.remove('3');
    });

    expect(result.current.nodes).toEqual([
      {
        key: '1',
        value: 'Node 1',
        children: [{ key: '2', value: 'Node 2', children: [] }],
      },
    ]);
    expect(onRemove).toHaveBeenLastCalledWith({ key: '3', value: 'Node 3' });
  });
  it('edits node correctly', () => {
    const onEditMock = jest.fn();
    const { result } = renderHook(() => useTree({ defaultNodes, onEdit: onEditMock }));

    act(() => {
      result.current.edit({ key: '1', value: 'Patched node 1' });
    });

    expect(result.current.nodes).toEqual([
      {
        key: '1',
        value: 'Patched node 1',
        children: [
          { key: '2', value: 'Node 2', children: [{ key: '3', value: 'Node 3' }] },
        ],
      },
    ]);
    expect(onEditMock).toHaveBeenLastCalledWith({
      key: '1',
      value: 'Patched node 1',
    });
  });
  describe('checking', () => {
    it('executes "onCheck" callback correctly', () => {
      const onCheckMock = jest.fn();
      const { result } = renderHook(() =>
        useTree({ defaultNodes, onCheck: onCheckMock }),
      );

      act(() => {
        result.current.setRowChecking({ '1': true, '2': true, '3': true });
      });

      expect(onCheckMock).toHaveBeenLastCalledWith(['1', '2', '3']);

      act(() => {
        result.current.setRowChecking({ '3': true });
      });

      expect(onCheckMock).toHaveBeenLastCalledWith(['3']);
    });
  });
  describe('expanding', () => {
    it('executes "onExpand" callback correctly', () => {
      const onExpandMock = jest.fn();
      const { result } = renderHook(() =>
        useTree({ defaultNodes, onExpand: onExpandMock }),
      );

      act(() => {
        result.current.setExpanded({ '1': true, '2': true, '3': true });
      });

      expect(onExpandMock).toHaveBeenLastCalledWith(['1', '2', '3']);

      act(() => {
        result.current.setExpanded({ '3': true });
      });

      expect(onExpandMock).toHaveBeenLastCalledWith(['3']);
    });
  });
  describe('pinning', () => {
    it('executes "onPin" callback correctly', () => {
      const onPinMock = jest.fn();
      const { result } = renderHook(() => useTree({ defaultNodes, onPin: onPinMock }));

      act(() => {
        result.current.setRowPinning({ top: ['1', '2'] });
      });

      expect(onPinMock).toHaveBeenLastCalledWith(['1', '2']);

      act(() => {
        result.current.setRowPinning({ top: ['2'] });
      });

      expect(onPinMock).toHaveBeenLastCalledWith(['2']);
    });
  });
});
