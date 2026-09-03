import { ColumnConfig } from '../../../../core/interfaces';

export type SavePresetButtonProps<T extends ColumnConfig = ColumnConfig> = {
  columns: T[];
};
