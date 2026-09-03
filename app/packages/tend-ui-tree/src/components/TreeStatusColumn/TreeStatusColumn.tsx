import React from 'react';
import { Dot, Tooltip } from '@rovna-ui/primitives';
import { useTheme } from '@rovna-ui/theme';
import { Box } from '@rovna-ui/grid';

import { TreeData, TreeNode } from '@rovna-internal/tree/core/interfaces';
import { MetaType } from '@rovna-internal/tree/types';

import { useNodeStatus } from '../TreeNode/hooks';
import { TreeStatusColumnProps } from './types';

export const TreeStatusColumn = <T extends TreeData = TreeData>({
  context,
}: TreeStatusColumnProps<T>) => {
  const theme = useTheme();
  const meta = context.table.options.meta as MetaType<T>;
  const node = context.row.original;

  const { isError, isWarning, isSuccess, isInfo } = useNodeStatus<TreeNode<T>>(
    context.row,
    meta,
  );
  const isDotVisible = [isError, isWarning, isSuccess, isInfo].some(Boolean);

  const [, color] =
    (
      [
        [isError, theme.colors.red600],
        [isWarning, theme.colors.gold600],
        [isSuccess, theme.colors.green600],
        [isInfo, theme.colors.blue600],
      ] as const
    ).filter(([condition]) => condition)[0] || [];

  const dotTooltipProps = React.useMemo(
    () => meta.getNodeStatusTooltipProps?.(node),
    [meta, node],
  );

  if (!isDotVisible) return null;

  return (
    <Box className='rovna-ui-tree-status-column'>
      <Tooltip {...dotTooltipProps}>
        <Dot
          style={{ marginLeft: '4px' }}
          className='rovna-ui-tree-node-status'
          color={color}
        />
      </Tooltip>
    </Box>
  );
};
