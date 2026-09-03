import { TreeData } from './TreeData';
import { TreeNode } from './TreeNode';

type Preload = 'oneveryexpand' | 'onemptyexpand';
export interface TreeAsync<T extends TreeData = TreeData> {
  preload?: Preload[];
  /**
   * Свойство позволяет асинхронно получать `children` раскрытого узла
   */
  onNodeChildrenRequest?: (node: TreeNode<T>) => Promise<TreeNode<T>[]>;
}
