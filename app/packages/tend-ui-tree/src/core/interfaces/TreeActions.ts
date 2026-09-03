import { DropdownItem } from '@rovna-ui/components/primitives';

import { TreeData } from './TreeData';
import { TreeNode } from './TreeNode';

type Options = {
  /**
   * Дефолтные действия дерева
   */
  readonly actions: DropdownItem[];
};

export interface TreeActions<T extends TreeData = TreeData> {
  getNodeActions?: (node: TreeNode<T>, options: Options) => DropdownItem[];
}
