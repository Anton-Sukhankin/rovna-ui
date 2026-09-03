import { CellContext } from '@tanstack/react-table';

import { TreeData, TreeNode } from '@rovna-internal/tree/core/interfaces';

export interface TreeStatusColumnProps<T extends TreeData = TreeData> {
  context: CellContext<TreeNode<T>, string>;
}
