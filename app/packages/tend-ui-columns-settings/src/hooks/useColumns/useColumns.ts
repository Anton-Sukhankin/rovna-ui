import React from 'react';
import { useCallbackRef, useControllableState } from '@rovna-ui/hooks';
import { LocalStorage, move as _move, order } from '@rovna-ui/utils';
import groupBy from 'lodash/groupBy';

import { Preset } from '@rovna-internal/columns-settings/core/interfaces/Preset';
import { createDefaultColumn } from '@rovna-internal/columns-settings/core/utils/createDefaultColumn';
import { patchColumnPosition } from '@rovna-internal/columns-settings/core/utils/patchColumnPosition';
import { mapColumnsForLocalStorage } from '@rovna-internal/columns-settings/core/utils/mapColumnsForLocalStorage';
import {
  AntdTableColumn,
  Column,
  ColumnConfig,
  ColumnPosition,
  ColumnsSettings,
  ColumnsSettingsPreset,
  ColumnsSettingsPresets,
} from '@rovna-internal/columns-settings/core/interfaces';

export interface UseColumnsParameters<TColumn extends ColumnConfig = ColumnConfig>
  extends ColumnsSettingsPresets {
  /**
   * Колонки для таблицы
   */
  columns?: TColumn[];
  /**
   * Колонки по умолчанию для таблицы
   */
  defaultColumns: TColumn[];
  /**
   * Колонки отображаемые в Drawer для контроля внутреннего состояния
   */
  internalColumns?: TColumn[];
  /**
   * Уникальный ключ `localStorage
   */
  localStorage?: string;
  /**
   * Колонки для игнорирования
   *
   * @deprecated Используйте свойство `ignored` напрямую у `ColumnConfig`
   */
  ignore?: string[];
  /**
   * Вызывается при изменении колонок
   */
  onColumnsChange?: (columns: TColumn[]) => void;
  onInternalColumnsChange?: (columns: TColumn[]) => void;
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

export const useColumns = <TColumn extends ColumnConfig = ColumnConfig>(
  parameters: UseColumnsParameters<TColumn>,
): ColumnsSettings<TColumn> => {
  const isControlled = typeof parameters.columns !== 'undefined';

  const defaultControlledColumns = React.useMemo<TColumn[]>(
    () => (parameters.columns || []).map(createDefaultColumn),
    [parameters],
  );
  const defaultColumns = React.useMemo<TColumn[]>(
    () => parameters.defaultColumns.map(createDefaultColumn),
    [parameters],
  );
  const previous = isControlled ? defaultControlledColumns : defaultColumns;
  const __previous = React.useRef<TColumn[]>(previous);

  const initialColumns = React.useMemo(() => {
    if (!parameters.localStorage)
      return parameters.defaultColumns.map(createDefaultColumn);

    /**
     * Получаем сохраненные колонки
     */
    const saved = LocalStorage.get<TColumn[]>(parameters.localStorage);
    /**
     * Если их нет, то возвращаем дефолтные
     */
    if (!saved) return parameters.defaultColumns.map(createDefaultColumn);
    /**
     * Валидируем входные колонки и сохраненные
     * Если какие-то различия, возвращаем дефолтные
     */
    if (!isColumnsValid(parameters.defaultColumns, saved))
      return parameters.defaultColumns.map(createDefaultColumn);

    const grouped = groupBy(saved, 'id');

    return parameters.defaultColumns
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
  }, [parameters.defaultColumns, parameters.localStorage]);

  /**
   * Внешний стейт колонок
   * Он уже идет на таблицу
   */
  const [__permanent = [], __setPermanent] = useControllableState({
    value: isControlled ? defaultControlledColumns : undefined,
    defaultValue: initialColumns,
    onChange: payload => {
      parameters.onColumnsChange?.(payload);
      __previous.current = payload;
      if (parameters.localStorage) {
        LocalStorage.set(parameters.localStorage, mapColumnsForLocalStorage(payload));
      }
    },
  });

  /**
   * Внутренний стейт колонок
   */
  const [__columns = [], ___setColumns] = useControllableState({
    value: parameters.internalColumns
      ? parameters.internalColumns.map(createDefaultColumn)
      : undefined,
    defaultValue: isControlled ? defaultControlledColumns : initialColumns,
    onChange: parameters.onInternalColumnsChange,
  });
  /**
   * Стейт пресетов
   */
  const [__presets = [], __setPresets] = useControllableState({
    defaultValue: parameters.defaultPresets?.map(defaultPreset => ({
      ...defaultPreset,
      value: defaultPreset.value.map(createDefaultColumn),
    })),
    onChange: payload => {
      parameters.onPresetsChange?.(payload);
    },
  });

  const ignore = React.useMemo(() => {
    const ignored = parameters.defaultColumns
      .filter(defaultColumn => defaultColumn.ignored === true)
      .map(defaultColumn => defaultColumn.id);

    return [...ignored, ...(parameters.ignore || [])];
  }, [parameters]);

  const applyPreset = useCallbackRef<(payload: ColumnsSettingsPreset) => void>(
    payload => {
      const grouped = groupBy(payload.value, 'id');

      ___setColumns((previousColumns = []) => {
        const ordering = payload.value.map(column => column.id);

        return order(previousColumns, ordering, 'id').map(column => {
          const searched = grouped[column.id];
          if (!searched) return column;

          const [{ visible, disabled, draggable, fixed, pinnable }] = searched;

          return { ...column, visible, disabled, draggable, fixed, pinnable };
        });
      });
      parameters.onPresetApply?.(payload);
    },
  );
  const savePreset = useCallbackRef<(payload: ColumnsSettingsPreset) => void>(payload => {
    __setPresets((previousPresets = []) => [...previousPresets, payload]);
    parameters.onPresetSave?.(payload);
  });
  const editPreset = useCallbackRef<(payload: ColumnsSettingsPreset) => void>(payload => {
    __setPresets((previousPresets = []) => {
      return previousPresets.map(previousPreset =>
        previousPreset.id === payload.id ? payload : previousPreset,
      );
    });
    parameters.onPresetEdit?.(payload);
  });
  const removePreset = useCallbackRef<(id: string) => void>(id => {
    let removed: ColumnsSettingsPreset | undefined;

    __setPresets((previousPresets = []) => {
      const target = previousPresets.find(previousPreset => previousPreset.id === id);
      removed = target;

      return previousPresets.filter(previousPreset => previousPreset.id !== id);
    });

    if (!removed) return;
    parameters.onPresetRemove?.(removed);
  });

  const swap = useCallbackRef((from: number, to: number) => {
    ___setColumns((previousColumns = []) => {
      const ignored = previousColumns.reduce<[number, TColumn][]>((acc, cv, index) => {
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

      return moved;
    });
  });
  const display = useCallbackRef((column: ColumnConfig, visible: boolean) => {
    ___setColumns((previousColumns = []) => {
      return previousColumns.map(previousColumn => {
        if (previousColumn.id === column.id) return { ...previousColumn, visible };

        return previousColumn;
      });
    });
  });
  const hide = useCallbackRef((column: ColumnConfig) => {
    display(column, false);
  });
  const show = useCallbackRef((column: ColumnConfig) => {
    display(column, true);
  });

  const pin = useCallbackRef((column: ColumnConfig, position: ColumnPosition) => {
    ___setColumns((previousColumns = []) => {
      const rightPosition = previousColumns.length - 1;
      const currentPosition = previousColumns.findIndex(value => value.id === column.id);
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

      return next;
    });
  });
  const unpin = useCallbackRef((column: ColumnConfig) => {
    ___setColumns((previousColumns = []) => {
      const next = previousColumns.map(prevColumn => {
        if (prevColumn.id === column.id) {
          return patchColumnPosition(prevColumn, 'none');
        }

        return prevColumn;
      });

      return next;
    });
  });
  const apply = useCallbackRef(() => {
    __setPermanent(__columns);
  });
  const reset = useCallbackRef(() => {
    ___setColumns(defaultColumns);
    __setPermanent(defaultColumns);
  });
  const toPrevious = useCallbackRef(() => {
    ___setColumns(__previous.current);
  });

  const createColumnModel = React.useCallback<(column: TColumn) => Column<TColumn>>(
    payload => ({
      // General
      id: payload.id,
      original: payload,
      getLabel: () => payload.label ?? payload.title,

      // Visibility
      getIsVisible: () => payload.visible === true,
      getIsDisabled: () => {
        const visible = __columns.filter(column => {
          const isIgnored = ignore.includes(column.id);
          const isVisible = column.visible === true;

          return !isIgnored && isVisible;
        });

        if (visible.length === 1 && payload.id === visible[0].id) return true;

        return payload.disabled === true;
      },
      getHideHandler: () => () => hide(payload),
      getShowHandler: () => () => show(payload),
      hide: () => hide(payload),
      show: () => show(payload),
      getVisibilityToggleHandler: () => () => {
        if (payload.visible === true) {
          hide(payload);

          return;
        }

        show(payload);
      },
      // Pinning
      getCanPin: () => payload.pinnable === true,
      getIsPinned: () => payload.fixed === 'left' || payload.fixed === 'right',
      getPinHandler: () => position => pin(payload, position),
      getUnpinHandler: () => () => unpin(payload),
      getPinningToggleHandler: () => () =>
        payload.fixed === undefined ? pin(payload, 'left') : unpin(payload),
      pin: position => pin(payload, position),
      unpin: () => unpin(payload),

      // Dragging
      getCanDrag: () => payload.draggable === true,
    }),
    [__columns, hide, ignore, pin, show, unpin],
  );
  const createAntdTableColumn = React.useCallback<(column: TColumn) => AntdTableColumn>(
    ({ label, title, ...rest }) => ({
      ...rest,
      ...createDefaultColumn(rest),
      title: title ?? label,
      fixed: rest.fixed === 'none' ? undefined : rest.fixed,
    }),
    [],
  );
  // FIXME: Привести к общему виду с createAntdTableColumn
  const createTableRootColumn = React.useCallback<(column: TColumn) => AntdTableColumn>(
    props => ({
      ...props,
      ...createDefaultColumn(props),
      title: props.title ?? props.label,
      fixed: props.fixed === 'none' ? undefined : props.fixed,
    }),
    [],
  );
  const createPresetModel = React.useCallback<(column: ColumnsSettingsPreset) => Preset>(
    preset => ({
      id: preset.id,
      original: preset,
      apply: () => {
        applyPreset(preset);
      },
      edit: (payload: ColumnsSettingsPreset) => editPreset(payload),
      remove: () => removePreset(preset.id),
    }),
    [applyPreset, editPreset, removePreset],
  );

  /**
   * Модели колонок
   */
  const columns = React.useMemo<Column<TColumn>[]>(
    () => __columns.filter(column => !ignore.includes(column.id)).map(createColumnModel),
    [__columns, createColumnModel, ignore],
  );

  const __tableRootColumns = React.useMemo<AntdTableColumn[]>(
    () => __permanent.map(createTableRootColumn),
    [__permanent, createTableRootColumn],
  );
  /**
   * Колонки для таблицы `antd`
   */
  const antdTableColumns = React.useMemo<AntdTableColumn[]>(
    () => __permanent.filter(column => column.visible).map(createAntdTableColumn),
    [__permanent, createAntdTableColumn],
  );
  /**
   * Модели пресетов
   */
  const presets = React.useMemo<Preset[]>(
    () => __presets.map(createPresetModel),
    [__presets, createPresetModel],
  );

  return {
    getColumns: () => columns,
    getDefaultColumns: () => defaultColumns,
    getAntdTableColumns: () => antdTableColumns,
    __getTableRootColumns: () => __tableRootColumns,
    getPresets: () => presets,
    getDefaultResetHandler: () => reset,
    getApplyHandler: () => apply,
    getPreviousResetHandler: () => toPrevious,
    getMoveByIndexHandler: () => swap,
    getSavePresetHandler: () => savePreset,
    getColumnPinningChangeHandler: () => (column, position) => pin(column, position),
    getColumnVisibilityChangeHandler: () => (column, visible) => display(column, visible),
  };
};
