import React from 'react';
import { FolderAdd } from '@rovna-ui/icons/FolderAdd';
import { FolderRemove } from '@rovna-ui/icons/FolderRemove';
import { Folder } from '@rovna-ui/icons/Folder';
import { useTheme } from '@rovna-ui/theme';
import { useCallbackRef } from '@rovna-ui/hooks';
import { File } from '@rovna-ui/icons/File';
import { isUndefined } from '@rovna-ui/utils';

import { TreeData } from '@rovna-internal/tree/core';
import { MetaType } from '@rovna-internal/tree/types';

import { Button } from './styled';
import { ExpandButtonProps } from './types';
import { useNodeType } from '../../hooks';

export const ExpandButton = <T extends TreeData = TreeData>({
  context,
  onNodeExpand,
}: ExpandButtonProps<T>) => {
  const theme = useTheme();
  const node = context.row.original;
  const { isLeaf } = useNodeType(node);

  const isExpanded = context.row.getIsExpanded();
  const meta = context.table.options.meta as MetaType<T>;
  const canExpand = meta.canExpandNode?.(node);

  const folderIcon = React.useMemo(() => {
    if (canExpand) {
      if (isExpanded) return <FolderRemove size={20} color='blue600' />;

      return <FolderAdd size={20} color='blue600' />;
    }

    return <Folder size={20} color='blue600' />;
  }, [canExpand, isExpanded]);

  const leafIcon = React.useMemo(() => {
    const icon = meta.getNodeBefore?.(node);

    return isUndefined(icon) ? <File size={20} color='gray500' /> : icon;
  }, [meta, node]);

  const handleClick = useCallbackRef((e: React.MouseEvent) => {
    if (!canExpand) return;
    e.stopPropagation();
    if (!isExpanded && !isLeaf) onNodeExpand?.(context.row.original);
    context.row.getToggleExpandedHandler()();
  });

  return isLeaf ? (
    <>{leafIcon}</>
  ) : (
    <Button
      theme={theme}
      data-testid={`rovna-ui-tree-node-expand-button-${context.row.id}`}
      className='rovna-ui-tree-node-expand-button'
      aria-label={`${isExpanded ? 'Свернуть' : 'Развернуть'} узел «${node.value}»`}
      aria-expanded={isExpanded}
      onClick={handleClick}
      type='button'
    >
      {folderIcon}
    </Button>
  );
};
