import { ColumnConfig } from '../../core/interfaces';

export const createDefaultColumn = <T extends ColumnConfig = ColumnConfig>(
  column: T,
): T => ({
  ...column,
  visible: column?.visible ?? true,
  pinnable: column?.pinnable ?? true,
  draggable: column?.draggable ?? true,
});
