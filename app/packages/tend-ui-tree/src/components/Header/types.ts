import { ButtonProps } from '@rovna-ui/primitives';
import { Table } from '@tanstack/react-table';

import { TreeData, TreeNode } from '@rovna-internal/tree/core';

export type HeaderProps<T extends TreeData = TreeData> = {
  placeholder?: string;
  filtersButtonProps?: ButtonProps<'button'>;
  showFiltersButton: boolean;
  table: Table<TreeNode<T>>;
  onSearch?: (search: string) => void;
};
