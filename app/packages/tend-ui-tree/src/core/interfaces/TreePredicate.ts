import { TreeData } from './TreeData';
import { TreeNode } from './TreeNode';

export type TreePredicate<T extends TreeData = TreeData> = (node: TreeNode<T>) => boolean;
