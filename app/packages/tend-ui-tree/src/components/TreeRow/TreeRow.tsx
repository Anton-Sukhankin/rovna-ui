import React from 'react';
import { Row as RowType, flexRender } from '@tanstack/react-table';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useCallbackRef } from '@rovna-ui/hooks';
import { Box } from '@rovna-ui/grid';
import { useTheme } from '@rovna-ui/theme';

import { TreeData, TreeDragData, TreeNode } from '@rovna-internal/tree/core';
import { Row } from '@rovna-internal/tree/ui/Row';
import { TreeDragInfo } from '@rovna-internal/tree/core/interfaces/TreeDragData';
import { TreeRowContext } from '@rovna-internal/tree/contexts/TreeRowContext';

import { TreeRowProps } from './types';
import { useNodeType } from '../TreeNode/hooks';
import { useDoubleClick } from './hooks';

const collectDragInfo = <T extends TreeData = TreeData>(
  row: RowType<TreeNode<T>>,
): TreeDragInfo<T> => {
  const parent = row.getParentRow();

  return {
    parent: parent ? collectDragInfo(parent) : null,
    node: row.original,
    depth: row.depth,
    index: row.index,
  };
};

export const TreeRow = <T extends TreeData = TreeData>({
  draggable,

  grabbed,
  depth,

  row,
  previous,
  next,

  onClick,
  onNodeExpand,

  canDragNode,
  canExpandNode,
}: TreeRowProps<T>) => {
  const theme = useTheme();

  const __parent = row.getParentRow() ?? null;

  const data: TreeDragData<T> = {
    parent: __parent ? collectDragInfo(__parent) : null,
    previous: previous ? collectDragInfo(previous) : null,
    current: collectDragInfo(row),
    next: next ? collectDragInfo(next) : null,
  };

  const isDraggable = draggable === true;
  const isNodeDraggable = canDragNode(row.original);
  const isSortable = isDraggable && isNodeDraggable;

  const { attributes, listeners, setNodeRef, transition, isDragging, transform } = useSortable({
      id: row.id,
      data,
      disabled: !isSortable,
    });

  const isExpanded = row.getIsExpanded();

  const _style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 999 : 0,
    position: 'relative',
  };

  const style: React.CSSProperties | undefined = row.getIsPinned()
    ? {
        position: 'sticky',
        top: `${row.getPinnedIndex() * 36}px`,
        zIndex: 500,
      }
    : _style;

  const { isBranch } = useNodeType(row.original);
  const type = isBranch ? 'branch' : 'leaf';
  const parentKey = __parent?.id;
  const isGrabbed = grabbed ? grabbed.current.node.key === row.id : false;
  const hasChildren = canExpandNode?.(row.original);

  const handleKeyDown = useCallbackRef((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === 'ArrowRight' && hasChildren && !isExpanded) {
      event.preventDefault();
      onNodeExpand?.(row.original);
      row.toggleExpanded(true);
    } else if (event.key === 'ArrowLeft' && isExpanded) {
      event.preventDefault();
      row.toggleExpanded(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(row.original);
    }
  });

  const handler = useDoubleClick({
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      /**
       * Предотвращаем срабатывание при клике на Checkbox
       */
      if (target.classList.contains('rovna-ui-checkbox-input')) return;
      const parent = target.closest('[data-tree-node-key]');
      if (!parent?.classList.contains('rovna-ui-tree-node-root')) return;

      onClick?.(row.original);
    },
    onDoubleClick: (e: React.MouseEvent) => {
      if (!hasChildren) return;
      e.preventDefault();
      if (!isExpanded) onNodeExpand?.(row.original);
      row.getToggleExpandedHandler()();
    },
  });

  const handleMouseDown = useCallbackRef((e: React.MouseEvent) => {
    /**
     * Выключаем выделение текста при двойном клике
     */
    if (e.detail === 2) e.preventDefault();
  });

  const extra = isGrabbed ? { paddingLeft: `${depth * 28 + 48}px` } : undefined;

  return (
    <TreeRowContext previous={previous} next={next}>
      <Row
        ref={setNodeRef}
        {...(isSortable ? attributes : undefined)}
        data-testid={`rovna-ui-tree-node-${row.id}`}
        data-tree-node-key={row.id}
        data-tree-parent-node-key={parentKey}
        data-tree-node-type={type}
        className='rovna-ui-tree-node-root'
        role='treeitem'
        aria-label={row.original.value}
        aria-level={row.depth + 1}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-posinset={row.index + 1}
        tabIndex={0}
        style={{ ...style, ...extra }}
        onClick={handler}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        {...(isSortable ? listeners : undefined)}
      >
        {isGrabbed ? (
          <Box
            $height='4px'
            $width='100%'
            $borderRadius='8px'
            $backgroundColor={theme.colors.blue600}
          />
        ) : (
          row
            .getVisibleCells()
            .map(cell => (
              <React.Fragment key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </React.Fragment>
            ))
        )}
      </Row>
    </TreeRowContext>
  );
};
