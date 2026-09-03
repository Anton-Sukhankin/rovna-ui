import {
  TreeActions,
  TreeAsync,
  TreeChecking,
  TreeData,
  TreeEditing,
  TreeExpanding,
  TreeNode,
  TreePinning,
  TreeStatus,
  useTree,
} from './core';
import { TreeCore } from './core/interfaces/TreeCore';
import { TreeDragging } from './core/interfaces/TreeDragging';
import { TreeFiltering } from './core/interfaces/TreeFiltering';
import { TreeSelection } from './core/interfaces/TreeSelection';

type UseTreeReturnType<T extends TreeData = TreeData> = ReturnType<typeof useTree<T>>;

export type TreeMethods<T extends TreeData = TreeData> = Pick<
  UseTreeReturnType<T>,
  'add' | 'remove' | 'edit' | 'find' | 'getNodes'
>;

export interface MetaType<T extends TreeData = TreeData>
  extends TreeMethods,
    TreeActions<T>,
    TreeChecking<T>,
    TreeExpanding,
    TreeEditing<T>,
    TreePinning,
    TreeStatus<T>,
    TreeDragging<T>,
    Pick<
      TreeCore<T>,
      | 'deletable'
      | 'getNodeBefore'
      | 'onNodeExpand'
      | 'getNodeCounter'
      | 'canExpandNode'
      | 'getNodeIconAfter'
    > {
  ellipsis: boolean;
  selectable: boolean;
  selectedKey?: string;
  selected: TreeNode<T> | null;
  select: (node: TreeNode<T> | null) => void;
  __parent: TreeNode<T> | null;
  onNodeChildrenRequest: (node: TreeNode<T>) => Promise<TreeNode<T>> | undefined;
}

export type TreeRef<T extends TreeData = TreeData> = TreeMethods<T>;

export interface TreeProps<T extends TreeData = TreeData>
  extends TreeChecking<T>,
    TreeExpanding,
    TreeFiltering,
    TreeEditing<T>,
    TreeStatus<T>,
    TreePinning,
    TreeActions<T>,
    TreeDragging<T>,
    TreeAsync<T>,
    TreeSelection<T>,
    TreeCore<T> {
  enableMultiRowSelection?: boolean;
  enableSubRowSelection?: boolean;
}
