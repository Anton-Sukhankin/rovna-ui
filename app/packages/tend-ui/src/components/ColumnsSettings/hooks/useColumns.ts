import React from 'react';
import groupBy from 'lodash/groupBy';
import { move as _move } from '@rovna-ui/utils/move';
import { LocalStorage } from '@rovna-ui/utils/LocalStorage';
import { useControllableState } from '@rovna-ui/hooks';
import { order } from '@rovna-ui/utils';

import {
  ColumnConfig,
  ColumnPosition,
} from '@rovna-internal/components/components/ColumnsSettings/core/interfaces';
import { useCallbackRef } from '@rovna-internal/components/hooks/useCallbackRef';

import { createDefaultColumn } from '../utils/createDefaultColumn';
import { mapColumnsForLocalStorage } from '../utils/mapColumnsForLocalStorage';
import { patchColumnPosition } from '../utils/patchColumnPosition';
import {
  ColumnsSettingsPreset,
  ColumnsSettingsPresets,
} from '../core/interfaces/ColumnsSettingsPreset';

interface UseColumnsParameters<T extends ColumnConfig = ColumnConfig>
  extends ColumnsSettingsPresets {
  /**
   * Уникальный ключ для хранения колонок в `localStorage`
   */
  localStorage?: string;
  /**
   * Начальные колонки
   */
  columns: T[];
  /**
   * Массив `id ` колонок для игнорирования
   */
  ignore?: string[];
  /**
   * Пресеты по умолчанию
   */
  defaultPresets?: ColumnsSettingsPreset[];
  /**
   * Вызывается при изменении пресетов
   */
  onPresetsChange?: (presets: ColumnsSettingsPreset[]) => void;
}

const isColumnsValid = (next: ColumnConfig[], prev: ColumnConfig[]) => {
  /**
   * Если количество изначальных колонок не совпадает с тем
   * что в localStorage (например добавились новые),
   * то сохраненные ранее колонки не валидны
   */
  if (next.length !== prev.length) return false;

  const nextIds = next.map(c => c.id);
  const prevIds = prev.map(c => c.id);
  const difference = nextIds.filter(id => !prevIds.includes(id));
  /**
   * Если id колонок не совпадают c тем что было раньше
   * то сохраненные ранее колонки не валидны
   */
  if (difference.length > 0) return false;

  return true;
};

/**
 * @deprecated Хук устарел и больше не поддерживается.
 * Используйте хук из пакета `@rovna-ui/columns-settings`.
 */
export const useColumns = <T extends ColumnConfig = ColumnConfig>(
  parameters: T[] | UseColumnsParameters<T>,
) => {
  const onPresetApply = React.useMemo(
    () => (!Array.isArray(parameters) ? parameters.onPresetApply : undefined),
    [parameters],
  );
  const onPresetSave = React.useMemo(
    () => (!Array.isArray(parameters) ? parameters.onPresetSave : undefined),
    [parameters],
  );
  const onPresetEdit = React.useMemo(
    () => (!Array.isArray(parameters) ? parameters.onPresetEdit : undefined),
    [parameters],
  );
  const onPresetRemove = React.useMemo(
    () => (!Array.isArray(parameters) ? parameters.onPresetRemove : undefined),
    [parameters],
  );

  const storageKey = !Array.isArray(parameters) ? parameters.localStorage : undefined;
  const ignore = React.useMemo(
    () => (!Array.isArray(parameters) ? parameters.ignore || [] : []),
    [parameters],
  );

  const defaultColumns = React.useMemo<T[]>(() => {
    if (Array.isArray(parameters)) return parameters.map(createDefaultColumn);

    return parameters.columns.map(createDefaultColumn);
  }, [parameters]);

  const initialColumns = React.useMemo(() => {
    if (Array.isArray(parameters)) return parameters.map(createDefaultColumn);
    if (!parameters.localStorage) return parameters.columns.map(createDefaultColumn);
    const saved = LocalStorage.get<T[]>(parameters.localStorage);
    if (!saved) return parameters.columns.map(createDefaultColumn);

    if (!isColumnsValid(parameters.columns, saved))
      return parameters.columns.map(createDefaultColumn);

    const grouped = groupBy(saved, 'id');

    return parameters.columns
      .map(createDefaultColumn)
      .sort((a, b) => {
        const first = saved.findIndex(column => column.id === a.id);
        const second = saved.findIndex(column => column.id === b.id);

        return first - second;
      })
      .map(column => {
        const [{ visible, disabled, draggable, fixed, pinnable }] = grouped[column.id];

        return { ...column, visible, disabled, draggable, fixed, pinnable };
      });
  }, [parameters]);

  const [_columns, _setColumns] = React.useState<T[]>(initialColumns);

  /**
   * initialColumns пересоздается на каждый ререндер из-за того,
   * что parameters - сложный объект. Чтобы избежать цикличных апдейтов
   * превращаем колонки в строку и сравниваем строки
   */
  const stringified = React.useMemo(
    () =>
      JSON.stringify(initialColumns.map(column => ({ id: column.id, key: column.key }))),
    [initialColumns],
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => _setColumns(initialColumns), [stringified]);

  const [__presets = [], __setPresets] = useControllableState({
    defaultValue: Array.isArray(parameters) ? undefined : parameters.defaultPresets,
    onChange: Array.isArray(parameters) ? undefined : parameters.onPresetsChange,
  });
  const applyPreset = useCallbackRef<(payload: ColumnsSettingsPreset) => void>(
    payload => {
      const grouped = groupBy(payload.value, 'id');
      _setColumns(previousColumns => {
        const ordering = payload.value.map(column => column.id);

        return order(previousColumns, ordering, 'id').map(column => {
          const [{ visible, disabled, draggable, fixed, pinnable }] = grouped[column.id];

          return { ...column, visible, disabled, draggable, fixed, pinnable };
        });
      });
      onPresetApply?.(payload);
    },
  );
  const savePreset = useCallbackRef<(payload: ColumnsSettingsPreset) => void>(payload => {
    __setPresets((previousPresets = []) => [...previousPresets, payload]);
    onPresetSave?.(payload);
  });
  const editPreset = useCallbackRef<(payload: ColumnsSettingsPreset) => void>(payload => {
    __setPresets((previousPresets = []) => {
      return previousPresets.map(previousPreset =>
        previousPreset.id === payload.id ? payload : previousPreset,
      );
    });
    onPresetEdit?.(payload);
  });
  const removePreset = useCallbackRef<(id: string) => void>(id => {
    let removed: ColumnsSettingsPreset | undefined;

    __setPresets((previousPresets = []) => {
      const target = previousPresets.find(previousPreset => previousPreset.id === id);
      removed = target;

      return previousPresets.filter(previousPreset => previousPreset.id !== id);
    });

    if (!removed) return;
    onPresetRemove?.(removed);
  });

  const swap = useCallbackRef((from: number, to: number) => {
    _setColumns(previousColumns => {
      const ignored = previousColumns.reduce<[number, T][]>((acc, cv, index) => {
        if (!ignore.includes(cv.id)) return acc;
        acc.push([index, cv]);

        return acc;
      }, []);

      const next = previousColumns
        .filter(column => !ignore.includes(column.id))
        .map((column, index) => {
          if (index === from) {
            return patchColumnPosition(column, 'none');
          }

          return column;
        });

      const moved = _move(next, from, to);

      ignored.forEach(([i, v]) => {
        moved.splice(i, 0, v);
      });

      if (storageKey) {
        LocalStorage.set(storageKey, mapColumnsForLocalStorage(moved));
      }

      return moved;
    });
  });
  const unpin = React.useCallback(
    (column: T) => {
      _setColumns(previousColumns => {
        const next = previousColumns.map(prevColumn => {
          if (prevColumn.id === column.id) {
            return patchColumnPosition(prevColumn, 'none');
          }

          return prevColumn;
        });

        if (storageKey) {
          LocalStorage.set(storageKey, mapColumnsForLocalStorage(next));
        }

        return next;
      });
    },
    [storageKey],
  );
  const pin = React.useCallback(
    (position: ColumnPosition, column: T) => {
      _setColumns(previousColumns => {
        const rightPosition = previousColumns.length - 1;
        const currentPosition = previousColumns.findIndex(
          value => value.id === column.id,
        );
        const pinned = previousColumns.filter(col => col.fixed === 'left');
        const positionsMap = {
          left: pinned.length,
          right: rightPosition,
          none: currentPosition,
        };
        const to = positionsMap[position];

        const moved = _move(previousColumns, currentPosition, to);
        const next = moved.map(movedColumn => {
          if (movedColumn.id === column.id)
            return patchColumnPosition(movedColumn, position);

          return movedColumn;
        });

        if (storageKey) {
          LocalStorage.set(storageKey, mapColumnsForLocalStorage(next));
        }

        return next;
      });
    },
    [storageKey],
  );
  const reset = useCallbackRef(() => {
    _setColumns(defaultColumns);
    if (!storageKey) return;
    LocalStorage.set(storageKey, mapColumnsForLocalStorage(defaultColumns));
  });
  const display = React.useCallback(
    (visible: boolean, column: T) => {
      _setColumns(previousColumns => {
        const next = previousColumns.map(previousColumn => {
          if (previousColumn.id === column.id) return { ...previousColumn, visible };

          return previousColumn;
        });

        if (storageKey) {
          LocalStorage.set(storageKey, mapColumnsForLocalStorage(next));
        }

        return next;
      });
    },
    [storageKey],
  );

  /**
   * `Table` columns
   */
  const columns = React.useMemo(
    () => _columns.filter(column => column.visible),
    [_columns],
  );

  /**
   * `ColumnsSettings` columns
   */
  const renderColumns = React.useMemo<T[]>(() => {
    const notIgnored = _columns.filter(column => !ignore.includes(column.id));
    const onlyVisibles = notIgnored.filter(column => column.visible);
    if (onlyVisibles.length === 1) {
      return notIgnored.map(column => {
        if (column.id === onlyVisibles[0].id) {
          return {
            ...column,
            disabled: true,
          };
        }

        return column;
      });
    }

    return notIgnored;
  }, [_columns, ignore]);

  const model = React.useMemo(
    () =>
      ({
        columns: renderColumns,
        set: _setColumns,
        swap,
        pin,
        unpin,
        reset,
        display,

        presets: __presets,
        savePreset,
        editPreset,
        removePreset,
        applyPreset,
      } as const),
    [
      __presets,
      applyPreset,
      display,
      editPreset,
      pin,
      removePreset,
      renderColumns,
      reset,
      savePreset,
      swap,
      unpin,
    ],
  );

  return [columns, model] as const;
};
