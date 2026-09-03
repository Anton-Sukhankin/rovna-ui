import { TooltipProps } from '@rovna-ui/components/primitives';

import { TreeData } from './TreeData';
import { TreeNode } from './TreeNode';
import { TreePredicate } from './TreePredicate';

export interface TreeChecking<T extends TreeData = TreeData> {
  /**
   * Отображение `Checkbox`
   */
  checkable?: boolean;
  /**
   * Доступность `Checkbox`
   */
  isNodeCheckboxDisabled?: TreePredicate<T>;
  /**
   * Свойства `Tooltip` для `Checkbox`
   */
  getNodeCheckboxTooltipProps?: (node: TreeNode<T>) => Pick<TooltipProps, 'title'>;
}
