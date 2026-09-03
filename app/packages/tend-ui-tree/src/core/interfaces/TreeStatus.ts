import { TooltipProps } from '@rovna-ui/components/primitives';

import { TreeData } from './TreeData';
import { TreeNode } from './TreeNode';

export interface TreeStatus<T extends TreeData = TreeData> {
  /**
   * Статус узла
   */
  getNodeStatus?: (
    node: TreeNode<T>,
  ) => 'error' | 'warning' | 'success' | 'info' | undefined;
  /**
   * Свойства `Tooltip` для статуса
   */
  getNodeStatusTooltipProps?: (node: TreeNode<T>) => Pick<TooltipProps, 'title'>;
}
