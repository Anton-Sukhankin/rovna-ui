import React from 'react';
import {
  ColumnDef,
  ExpandedState,
  FilterFn,
  FilterFnOption,
  RowPinningState,
  RowSelectionState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Text } from '@rovna-ui/typography';
import { Delete } from '@rovna-ui/icons/Delete';
import { Button, Dialog } from '@rovna-ui/components/primitives';
import { Counter, Empty, Spinner } from '@rovna-ui/primitives';
import { Box } from '@rovna-ui/grid';
import { useCallbackRef, useControllableState } from '@rovna-ui/hooks';
import { position as _position, clamp, isUndefined } from '@rovna-ui/utils';
import { edit as _edit, filter as _filter, find as _find } from '@rovna-ui/utils/tree';
import ReactDOM from 'react-dom';

import { TreeProps, TreeRef } from './types';
import { Header, List, TreeNode, TreeRow, TreeStatusColumn } from './components';
import { useTree } from './core/useTree';
import { TreeData, TreeDragData, TreeNode as TreeNodeType } from './core';
import {
  isBranch as _isBranch,
  collect,
  computeBoundaries,
  computeNeighbors,
  computeParent,
  computePosition,
} from './utils';
import { Row } from './ui/Row';
import { includesStringAndChildren } from './filteringAlgorithms';

const INDENT_SIZE = 28;
const STYLE = {
  display: 'inline',
  padding: '8px 12px',
  borderRadius: '8px',
  boxShadow: '0px 15px 15px 0 rgba(34, 33, 81, 0.1)',
};

const _Tree = <T extends TreeData>(
  props: TreeProps<T>,
  ref: React.ForwardedRef<TreeRef<T>>,
) => {
  const {
    getNodes,
    nodes,
    add,
    remove,
    batchRemove,
    edit,
    find,
    rowPinning,
    setRowPinning,
    expanded,
    setExpanded,
    rowChecking,
    setRowChecking,
    setNodes,
  } = useTree<T>(props);

  const {
    placeholder,
    selectedKey,
    defaultSelectedKey,
    showFiltersButton = false,
    filtersButtonProps,
    loading = false,
    ellipsis = true,
    selectable = true,
    searchable = true,
    checkable = true,
    expandable = true,
    autoexpand,

    filtering = true,
    filteringAlgorithm = 'includesString',

    deletable = false,
    pinnable = false,
    draggable = false,

    canAddNode = () => false,
    canEditNode = () => false,
    canRemoveNode = () => true,
    canPinNode = () => true,
    canDragNode = () => true,
    canDropNode = () => true,

    isNodeCheckboxDisabled = () => false,
    getNodeStatusTooltipProps,
    getNodeStatus,
    getNodeCheckboxTooltipProps,
    getNodeActions,
    onClick,
    onSelect,
    onNodeClick,
    onSearch,
    onScroll,
    onNodeExpand,
    getNodeBefore,
    getNodeCounter,
    getNodeIconAfter,

    onNodeChildrenRequest,

    canExpandNode = node => Array.isArray(node.children) && node.children.length > 0,

    onNodeDragEnd,

    footer,
    preload = ['onemptyexpand'],
  } = props;

  const isOnEmptyExpand = preload.includes('onemptyexpand');
  const isOnEveryExpand = preload.includes('oneveryexpand');
  const isAutoExpandOnSearch = autoexpand?.includes('onsearch');
  const _onSelect = onSelect ?? onClick;

  const [__selectedKey, __setSelectedKey] = useControllableState({
    value: selectedKey,
    defaultValue: defaultSelectedKey,
    onChange: key => {
      /**
       * Ищем нужный элемент в дереве
       */
      const found = find(key);
      if (!found) return;
      _onSelect?.(found);
    },
  });

  const select = useCallbackRef((node: TreeNodeType<T>) => {
    __setSelectedKey(node.key);
    onNodeClick?.(node);
  });

  /**
   * Новая глубина на которую тянут узел
   */
  const [__depth, __setDepth] = React.useState(0);
  /**
   * Текущий перетаскиваемый узел
   */
  const [__grabbed, __setGrabbed] = React.useState<TreeDragData<T> | null>(null);
  /**
   * Новый родитель перетаскиваемого узла
   */
  const [__parent, __setParent] = React.useState<TreeNodeType<T> | 'root' | null>(null);
  /**
   * Новая позиция перетаскиваемого узла (index)
   */
  const [__position, __setPosition] = React.useState<number | null>(null);

  const handleSelect = useCallbackRef((node: TreeNodeType<T>) => {
    if (!selectable) return;
    select(node);
  });
  const handleRemoveClick = useCallbackRef(() => {
    Dialog.error({
      title: 'Вы действительно хотите удалить выбранные элементы?',
      okText: 'Да',
      cancelText: 'Нет',
      okButtonProps: { preset: 'danger', variant: 'ghost' },
      cancelButtonProps: { variant: 'primary', preset: 'default', danger: false },
      onOk: () => {
        batchRemove(Object.keys(rowChecking || {}));
        setRowChecking({});
      },
    });
  });
  const resetDndStates = useCallbackRef(() => {
    __setGrabbed(null);
    __setParent(null);
    __setPosition(null);
    __setDepth(0);
    document.body.style.setProperty('cursor', '');
  });
  const handleDragStart = useCallbackRef((e: DragStartEvent) => {
    if (!e.active.data.current) return;
    const payload = e.active.data.current as TreeDragData<T>;
    __setGrabbed(payload);
    document.body.style.setProperty('cursor', 'grabbing');
  });
  const handleDragMove = useCallbackRef((e: DragMoveEvent) => {
    if (!e.over || !e.over.data.current) return;

    const dragged = e.active.data.current as TreeDragData<T>;
    const overed = e.over.data.current as TreeDragData<T>;
    const draggedDepth = Math.round(e.delta.x / INDENT_SIZE);
    const nextDepth = dragged.current.depth + draggedDepth;

    const [previous, next] = computeNeighbors(dragged, overed, e.delta.y);
    const [min, max] = computeBoundaries(previous, next);
    const normalized = clamp(nextDepth, min, max);
    const parent = computeParent(normalized, previous);
    const position = computePosition(
      normalized,
      previous,
      dragged.parent ? dragged.parent.node : null,
      parent,
      e.delta.y,
    );

    __setDepth(normalized);
    __setParent(parent ? parent : 'root');
    __setPosition(position);
  });
  const handleDragEnd = useCallbackRef((e: DragEndEvent) => {
    if (
      !e.over ||
      !e.over.data.current ||
      !__grabbed ||
      !__parent ||
      __position === null
    ) {
      resetDndStates();

      return;
    }

    const isParentDroppable = __parent === 'root' ? true : canDropNode(__parent);
    const isBranch = __parent === 'root' ? true : _isBranch(__parent);
    if (!isParentDroppable || !isBranch) {
      resetDndStates();

      return;
    }

    setNodes((previous = []) => {
      const finding = __grabbed.current.node;
      /**
       * Собираем всех потомков
       */
      const children = collect([finding]);
      /**
       * Удаляем захваченный элемент и всех его потомком из дерева
       */
      const filtered = _filter(previous, node => !children.includes(node.key));

      if (__parent === 'root') {
        /**
         * Вставляем в нового родителя захваченный узел
         */
        const edited = _position(filtered, finding, __position);

        return edited;
      } else {
        /**
         * Ищем нового родителя
         */
        const _parent = _find(filtered, node => node.key === __parent.key);
        if (!_parent) return previous;

        /**
         * Вставляем в нового родителя захваченный узел
         */
        const edited = _edit(
          filtered,
          {
            ..._parent,
            children: _position([...(_parent.children || [])], finding, __position),
          },
          v => v.key === __parent.key,
        );

        return edited;
      }
    });

    onNodeDragEnd?.({
      grabbed: [__grabbed.current.node],
      from: {
        parent: __grabbed.parent ? __grabbed.parent.node : 'root',
      },
      to: {
        parent: __parent,
      },
    });

    resetDndStates();
  });
  const handleNodeExpand = useCallbackRef((node: TreeNodeType<T>) => {
    onNodeExpand?.(node);
  });

  const handleNodeChildrenRequest = useCallbackRef((node: TreeNodeType<T>) => {
    if (!onNodeChildrenRequest || !Array.isArray(node.children)) return;

    if (isOnEveryExpand) {
      return onNodeChildrenRequest(node).then(children => {
        edit({ ...node, children }, false);

        return children;
      });
    }

    if (isOnEmptyExpand) {
      if (node.children.length > 0) return;

      return onNodeChildrenRequest(node).then(children => {
        edit({ ...node, children }, false);

        return children;
      });
    }
  });

  const filterFn = React.useMemo<FilterFn<T> | FilterFnOption<T>>(() => {
    if (filteringAlgorithm === 'includesString') return filteringAlgorithm;

    return includesStringAndChildren;
  }, [filteringAlgorithm]);

  const table = useReactTable({
    data: nodes,
    columns: React.useMemo<ColumnDef<TreeNodeType<T>, string>[]>(
      () => [
        {
          accessorKey: 'value',
          cell: context => <TreeNode<TreeNodeType<T>> context={context} />,
          filterFn,
        },
        {
          accessorKey: 'status',
          cell: context => <TreeStatusColumn context={context} />,
        },
      ],
      [filterFn],
    ),
    enableMultiRowSelection: props.enableMultiRowSelection,
    enableSubRowSelection: props.enableSubRowSelection,
    meta: {
      getNodes,
      expandable,
      onNodeExpand,

      getNodeStatus,
      getNodeStatusTooltipProps,
      getNodeCounter,
      getNodeIconAfter,

      getNodeActions,

      checkable,
      isNodeCheckboxDisabled,
      getNodeCheckboxTooltipProps,

      canAddNode,
      canEditNode,

      ellipsis,
      deletable,
      canRemoveNode,
      canDragNode,
      canDropNode,

      pinnable,
      canPinNode,

      add,
      remove,
      edit,
      find,

      selectedKey: __selectedKey,
      select,

      getNodeBefore,
      canExpandNode,

      __parent,

      onNodeChildrenRequest: handleNodeChildrenRequest,
    },
    state: {
      rowPinning,
      rowSelection: rowChecking,
      expanded,
    },
    onRowPinningChange: setRowPinning as React.Dispatch<
      React.SetStateAction<RowPinningState>
    >,
    onRowSelectionChange: setRowChecking as React.Dispatch<
      React.SetStateAction<RowSelectionState>
    >,
    onExpandedChange: setExpanded as React.Dispatch<React.SetStateAction<ExpandedState>>,
    getRowId: row => row.key,
    getSubRows: row => row.children,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    filterFromLeafRows: true,
    /**
     * Нужно для того, чтобы не падала ошибки при передаче несуществующих key
     * для закрепления
     */
    keepPinnedRows: false,
    getRowCanExpand: () => true,
    manualFiltering: filtering === false,
  });

  /**
   * При поиске автоматически раскрываем все узлы
   */
  React.useEffect(() => {
    if (!isAutoExpandOnSearch || !expandable) return;
    if (table.getState().expanded === true) return;
    if (!table.getState().columnFilters.length) return;
    table.toggleAllRowsExpanded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnFilters, isAutoExpandOnSearch, expandable]);

  React.useImperativeHandle(ref, () => ({
    add,
    edit,
    remove,
    find,
    getNodes,
  }));

  const checkedKeys = React.useMemo(() => Object.keys(rowChecking || {}), [rowChecking]);
  const hasCheckedNodes = checkedKeys.length > 0;

  const _footer = React.useMemo(() => {
    if (isUndefined(footer))
      return (
        deletable &&
        hasCheckedNodes && (
          <Box
            $display='flex'
            $alignItems='center'
            $gap={8}
            className='rovna-ui-tree-footer'
          >
            <Button
              data-testid='rovna-ui-tree-delete-button'
              before={<Delete />}
              variant='secondary'
              fullWidth
              onClick={handleRemoveClick}
            >
              Удалить
            </Button>
          </Box>
        )
      );

    return (
      <Box $display='flex' $alignItems='center' $gap={8} className='rovna-ui-tree-footer'>
        {footer}
      </Box>
    );
  }, [deletable, footer, handleRemoveClick, hasCheckedNodes]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const excluded = React.useMemo(
    () => (__grabbed ? collect(__grabbed.current.node.children || []) : []),
    [__grabbed],
  );

  const items = React.useMemo(
    () =>
      table
        .getRowModel()
        .flatRows.map(row => row.id)
        .filter(id => !excluded.includes(id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [excluded, table.getRowModel().flatRows],
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragCancel={resetDndStates}
      onDragEnd={handleDragEnd}
    >
      <Box
        $display='flex'
        $flexDirection='column'
        $gap={8}
        $width='100%'
        $height='100%'
        data-testid='rovna-ui-tree'
        className='rovna-ui-tree-root'
      >
        {searchable && (
          <Header<T>
            placeholder={placeholder}
            showFiltersButton={showFiltersButton}
            filtersButtonProps={filtersButtonProps}
            table={table}
            onSearch={onSearch}
          />
        )}
        <List items={items} onScroll={onScroll}>
          <Spinner loading={loading}>
            {table.getRowModel().rows.length > 0 ? (
              table
                .getRowModel()
                .rows.filter(row => !excluded.includes(row.id))
                .map((row, index, self) => {
                  const previous = self[index - 1] ?? null;
                  const next = self[index + 1] ?? null;

                  return (
                    <TreeRow
                      key={row.id}
                      draggable={draggable}
                      grabbed={__grabbed}
                      depth={__depth}
                      row={row}
                      previous={previous}
                      next={next}
                      canDragNode={canDragNode}
                      onClick={handleSelect}
                      onNodeExpand={handleNodeExpand}
                      canExpandNode={canExpandNode}
                    />
                  );
                })
            ) : (
              <Empty variant='no-results' title='Ничего не найдено' />
            )}
          </Spinner>
        </List>
        {_footer}
      </Box>
      {ReactDOM.createPortal(
        <DragOverlay>
          {__grabbed && (
            <>
              <Box
                style={{
                  display: 'inline-block',
                  width: `${(__grabbed.current.depth + 1) * 56}px`,
                }}
              />

              <Row style={STYLE}>
                <Text mr={8}>{__grabbed.current.node.value}</Text>
                <Counter
                  preset='blue'
                  inner={collect(__grabbed.current.node.children || []).length}
                />
              </Row>
            </>
          )}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};

const Tree = React.forwardRef(_Tree) as (<T extends TreeData = TreeData>(
  props: TreeProps<T> & { ref?: React.Ref<TreeRef> },
) => React.JSX.Element) &
  Pick<React.FC<TreeProps>, 'displayName'>;

Tree.displayName = 'Tree';

export { Tree };
