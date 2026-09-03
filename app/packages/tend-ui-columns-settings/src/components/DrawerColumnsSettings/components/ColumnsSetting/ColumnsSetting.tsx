import React from 'react';
import { Toggle } from '@rovna-ui/components/primitives';

import { ColumnConfig } from '@rovna-internal/columns-settings/core/interfaces';

import { ColumnsSettingProps } from './types';
import { DragHandle, Pin, Root } from './components';

const BaseColumnsSetting = <T extends ColumnConfig = ColumnConfig>({
  column,
}: ColumnsSettingProps<T>) => {
  return (
    <Root column={column.original}>
      <Toggle
        data-testid='rovna-ui-columns-settings-column-setting-toggle'
        style={{ width: '100%' }}
        checked={column.getIsVisible()}
        disabled={column.getIsDisabled()}
        UNSTABLE_styling={React.useMemo(() => ({ Text: { strong: true } }), [])}
        onChange={React.useCallback(() => {
          column.getVisibilityToggleHandler()();
        }, [column])}
      >
        {column.getLabel()}
      </Toggle>
      <Pin
        disabled={!column.getCanPin()}
        pinned={column.getIsPinned()}
        onChange={React.useCallback(
          p => {
            column.pin(p);
          },
          [column],
        )}
      />
      <DragHandle
        aria-label={`Изменить порядок: ${column.getLabel()}`}
        disabled={!column.getCanDrag()}
      />
    </Root>
  );
};

const MemoizedColumnsSetting = React.memo(
  BaseColumnsSetting,
) as typeof BaseColumnsSetting;

const ColumnsSetting = Object.assign(MemoizedColumnsSetting, {
  Root,
  DragHandle,
  Pin,
});

export { ColumnsSetting };
