import React from 'react';
import { useCallbackRef, useControllableState } from '@rovna-ui/hooks';
import { ExpandedState, RowPinningState, RowSelectionState } from '@tanstack/react-table';
import { sort } from '@rovna-ui/utils/tree/sort';
import { find as _find } from '@rovna-ui/utils/tree/find';
import { edit as _patch } from '@rovna-ui/utils/tree/edit';
import { prepend } from '@rovna-ui/utils/tree/prepend';
import { filter as filter } from '@rovna-ui/utils/tree/filter';
import { LocalStorage } from '@rovna-ui/utils/LocalStorage';
import { isBoolean } from '@rovna-ui/utils';

import { sortNodesByPinned } from '../utils/sortNodesByPinned';
import { TreeNode } from './interfaces/TreeNode';
import { TreeData } from './interfaces/TreeData';
import { TreeCore } from './interfaces/TreeCore';

const mapKeysToTanStackTableState = (keys: string[]) =>
  keys.reduce<Record<string, boolean>>((result, currentValue) => {
    result[currentValue] = true;

    return result;
  }, {});

export const useTree = <T extends TreeData = TreeData>(props: TreeCore<T>) => {
  /**
   * Узлы дерева
   */
  const [nodes = [], setNodes] = useControllableState<TreeNode<T>[]>({
    value: props.nodes,
    defaultValue: React.useMemo(() => {
      if (!props.defaultNodes) return undefined;

      let pinnedKeys: string[] = [];
      if (props.localStorage) {
        const saved = LocalStorage.get<string[]>(
          `[rovna-ui-tree][pinning-keys][${props.localStorage}]`,
        );
        if (saved) {
          pinnedKeys = saved;
        } else if (props.defaultPinnedKeys) {
          pinnedKeys = props.defaultPinnedKeys;
        }
      } else if (props.defaultPinnedKeys) {
        pinnedKeys = props.defaultPinnedKeys;
      }

      const alphabeticallySorted = sort(props.defaultNodes, (a, b) =>
        a.value.localeCompare(b.value),
      );

      return sortNodesByPinned<T>(
        alphabeticallySorted,
        pinnedKeys,
        props.nodeFieldToSortBy,
      );
    }, [
      props.defaultNodes,
      props.localStorage,
      props.defaultPinnedKeys,
      props.nodeFieldToSortBy,
    ]),
    onChange: props.onChange,
  });

  /**
   * Раскрытие узлов
   */
  const [expanded, setExpanded] = useControllableState<ExpandedState | undefined>({
    value: React.useMemo(() => {
      if (!props.expandedKeys) return undefined;

      return mapKeysToTanStackTableState(props.expandedKeys);
    }, [props.expandedKeys]),
    defaultValue: React.useMemo(() => {
      if (props.localStorage) {
        const saved = LocalStorage.get<string[]>(
          `[rovna-ui-tree][expanding-keys][${props.localStorage}]`,
        );

        if (saved) return mapKeysToTanStackTableState(saved);
      }

      if (props.defaultExpandedKeys)
        return mapKeysToTanStackTableState(props.defaultExpandedKeys);

      return {};
    }, [props.defaultExpandedKeys, props.localStorage]),
    onChange: (state = {}) => {
      if (isBoolean(state)) return;
      const keys = Object.keys(state);
      props.onExpand?.(keys);
      if (!props.localStorage) return;
      LocalStorage.set(`[rovna-ui-tree][expanding-keys][${props.localStorage}]`, keys);
    },
  });
  /**
   * Выбор узлов при отметке Checkbox'ом
   */
  const [rowChecking, setRowChecking] = useControllableState<
    RowSelectionState | undefined
  >({
    value: React.useMemo(() => {
      if (!props.checkedKeys) return undefined;

      return mapKeysToTanStackTableState(props.checkedKeys);
    }, [props.checkedKeys]),
    defaultValue: React.useMemo(() => {
      if (!props.defaultCheckedKeys) return {};

      return mapKeysToTanStackTableState(props.defaultCheckedKeys);
    }, [props.defaultCheckedKeys]),
    onChange: (state = {}) => {
      const keys = Object.keys(state);
      props.onCheck?.(keys);
    },
  });

  const [rowPinning, setRowPinning] = useControllableState<RowPinningState | undefined>({
    value: React.useMemo(() => {
      if (!props.pinnedKeys) return undefined;

      return { top: props.pinnedKeys };
    }, [props.pinnedKeys]),
    defaultValue: React.useMemo(() => {
      if (props.localStorage) {
        const saved = LocalStorage.get<string[]>(
          `[rovna-ui-tree][pinning-keys][${props.localStorage}]`,
        );
        if (saved) return { top: saved };
      }

      if (props.defaultPinnedKeys) return { top: props.defaultPinnedKeys };

      return {};
    }, [props.defaultPinnedKeys, props.localStorage]),
    onChange: pinning => {
      const keys = pinning?.top || [];

      setNodes(prevNodes => {
        const nodesSortedByPinned = sortNodesByPinned<T>(
          prevNodes,
          keys,
          props.nodeFieldToSortBy,
        );

        return nodesSortedByPinned;
      });

      props.onPin?.(keys);
      if (!props.localStorage) return;
      LocalStorage.set(`[rovna-ui-tree][pinning-keys][${props.localStorage}]`, keys);
    },
  });

  /**
   * Добавление нового узла в родителя по его ключу
   */
  const add = useCallbackRef((key: string, payload: TreeNode<T>) => {
    setNodes((p = []) => prepend(p, payload, node => node.key === key));
    props?.onAdd?.(payload);
  });

  /**
   * Удаление узла по его ключу
   */
  const remove = useCallbackRef((key: string) => {
    let removed: TreeNode<T> | undefined = undefined;

    setNodes((p = []) => {
      const copy = [...p];
      let isRemoved = false;

      function traverse(nodes: TreeNode<T>[]) {
        if (isRemoved) return;

        nodes.forEach((node, i) => {
          if (node.key === key) {
            nodes.splice(i, 1);
            isRemoved = true;
            removed = node;

            return;
          }

          if (!Array.isArray(node.children)) return;

          traverse(node.children);
        });
      }

      traverse(copy);

      return copy;
    });

    if (!removed) return;
    props?.onRemove?.(removed);
  });

  const batchRemove = useCallbackRef((keys: string[]) =>
    setNodes((p = []) => filter(p, node => !keys.includes(node.key))),
  );

  /**
   * Патчинг узла по его ключу
   */
  const edit = useCallbackRef((payload: TreeNode<T>, callback = true) => {
    setNodes((p = []) => _patch(p, payload, node => node.key === payload.key));
    /**
     * FIXME: Временное решение
     * Нужно разграничить логику
     */
    if (!callback) return;
    props?.onEdit?.(payload);
  });

  const find = useCallbackRef((key: string) => _find(nodes, node => node.key === key));
  const getNodes = useCallbackRef(() => nodes);

  return {
    getNodes,
    nodes,
    add,
    remove,
    batchRemove,
    edit,
    find,
    expanded,
    setExpanded,
    rowChecking,
    setRowChecking,
    rowPinning,
    setRowPinning,
    setNodes,
  };
};
