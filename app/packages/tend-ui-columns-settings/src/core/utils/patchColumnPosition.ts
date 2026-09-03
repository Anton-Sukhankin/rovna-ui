import omit from 'lodash/omit';

import { ColumnConfig, ColumnPosition } from '../../core/interfaces';

export const patchColumnPosition = <T extends ColumnConfig = ColumnConfig>(
  column: T,
  position: ColumnPosition,
): T => {
  if (position === 'none') return omit(column, 'fixed') as T;

  return { ...column, fixed: position };
};
