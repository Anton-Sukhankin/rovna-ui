import pick from 'lodash/pick';

import { ColumnConfig } from '../interfaces';

export const mapColumnsForLocalStorage = <T extends ColumnConfig = ColumnConfig>(
  columns: T[],
) => {
  return columns.map(column =>
    pick(column, ['id', 'visible', 'disabled', 'draggable', 'fixed', 'pinnable']),
  );
};
