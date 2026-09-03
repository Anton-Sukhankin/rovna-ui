import { TreeData } from './TreeData';

/**
 * Фабрика дерева
 */
export type TreeNode<T = TreeData> = T & {
  key: string;
  value: string;
  children?: TreeNode<T>[];
};
