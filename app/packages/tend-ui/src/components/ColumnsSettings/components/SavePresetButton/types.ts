import { ColumnConfig } from '../../types';

export type SavePresetButtonProps<T extends ColumnConfig = ColumnConfig> = {
  columns: T[];
};
