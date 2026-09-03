import pick from 'lodash/pick';

import {
  ColumnConfig,
  ColumnsSettingsPresetValue,
} from '@rovna-internal/columns-settings/core/interfaces';

export const mapColumnsForPreset = <T extends ColumnConfig = ColumnConfig>(
  columns: T[],
): ColumnsSettingsPresetValue[] => {
  return columns.map(column =>
    pick(column, ['id', 'visible', 'disabled', 'draggable', 'fixed', 'pinnable']),
  );
};
