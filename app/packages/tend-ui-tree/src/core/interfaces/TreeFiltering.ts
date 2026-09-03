export type TreeFilteringAlgorithm = 'includesString' | 'includesStringAndChildren';

export interface TreeFiltering {
  /**
   * Позволяем включать/выключать встроенную фильтрацию дерева
   * @default true
   */
  filtering?: boolean;
  /**
   * Алгоритм фильтрации дерева
   */
  filteringAlgorithm?: TreeFilteringAlgorithm;
}
