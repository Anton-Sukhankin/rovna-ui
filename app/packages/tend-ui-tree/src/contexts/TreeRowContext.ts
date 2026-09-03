import { createContext } from '@rovna-ui/factories';
import { Any } from '@rovna-ui/types';
import { Row } from '@tanstack/react-table';

import { TreeNode } from '@rovna-internal/tree/core/index';

export const [TreeRowContext, useTreeRowContext] = createContext<{
  previous: Row<TreeNode<Any>> | null;
  next: Row<TreeNode<Any>> | null;
}>('TreeRowContext');
