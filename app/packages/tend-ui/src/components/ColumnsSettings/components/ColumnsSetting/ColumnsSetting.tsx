import React from 'react';

import { ColumnConfig } from '@rovna-internal/components/components/ColumnsSettings/core/interfaces';

import { ColumnsSettingProps } from './types';
import { Toggle } from './styled';
import { DragHandle, Pin, Root } from './components';

const BaseColumnsSetting = <T extends ColumnConfig = ColumnConfig>({
  column,
  onColumnVisibilityChange,
  onColumnPinningChange,
}: ColumnsSettingProps<T>) => {
  return (
    <Root column={column}>
      <Toggle
        data-testid='rovna-ui-columns-settings-column-setting-toggle'
        checked={column.visible}
        disabled={column.disabled}
        UNSTABLE_styling={React.useMemo(() => ({ Text: { strong: true } }), [])}
        onChange={React.useCallback(
          visible => {
            onColumnVisibilityChange?.(visible, column);
          },
          [column, onColumnVisibilityChange],
        )}
      >
        {column.label || column.title}
      </Toggle>
      <Pin
        disabled={!column.pinnable}
        pinned={!!column.fixed}
        onChange={React.useCallback(
          p => onColumnPinningChange?.(p, column),
          [column, onColumnPinningChange],
        )}
      />
      <DragHandle disabled={!column.draggable} />
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
