import { FormProviderProps } from 'antd-core/es/form/context';
import uniqBy from 'lodash/uniqBy';
import mapValues from 'lodash/mapValues';
import { GenericObject, ValueOf } from '@rovna-ui/types';
import { useCallbackRef } from '@rovna-ui/hooks';
import { INTERNAL_useDependsGraph as useDependsGraph } from '@rovna-ui/filters';

import { FormName, Scope } from '@rovna-internal/table/Table/consts';
import { SortingOrder } from '@rovna-internal/table/Table/types/SortingOrder';
import { FilterConfig } from '@rovna-internal/table/Table/types';

type OnSearchValueChange = (changed: { search: string }, value: string) => void;

/**
 * @internal Не для публичного использования
 */
export const useFormChangeCallback = <
  F extends GenericObject = GenericObject,
>(parameters: {
  filters?: FilterConfig[];
  onFilterValuesChange?: (changed: Partial<F>, values: F) => void;
  onSorterValuesChange?: (
    changed: Partial<Record<keyof F, SortingOrder>>,
    values: Record<keyof F, SortingOrder>,
  ) => void;
  onSearchValueChange?: OnSearchValueChange;
}) => {
  const { filters, onFilterValuesChange, onSorterValuesChange, onSearchValueChange } =
    parameters || {};

  const dependencies = useDependsGraph(filters);

  return useCallbackRef<NonNullable<FormProviderProps['onFormChange']>>((name, info) => {
    // Ignoring random custom "Form" components under the "Form.Provider"

    if (
      ![
        FormName.Filter,
        FormName.Filters,
        FormName.Sorter,
        FormName.Sorters,
        FormName.Search,
      ].includes(name as ValueOf<typeof FormName>)
    )
      return;

    // TODO: Переписать и сделать проще
    const mapped = info.changedFields.map(field => {
      const scope = field.name.at(0);
      const name = field.name.at(1);
      const _name = scope === 'search' ? 'search' : name;

      return {
        scope,
        name: _name,
        value: field.value,
        payload: {
          [_name]: field.value,
        },
      };
    });

    const [final] = uniqBy(mapped, 'scope');

    const forms = {
      filters: info.forms[FormName.Filters] || info.forms[FormName.Filter],
      sorters: info.forms[FormName.Sorters] || info.forms[FormName.Sorter],
      search: info.forms[FormName.Search],
    } as const;

    const touched = final.name as string;
    const scope = final.scope as ValueOf<typeof Scope>;
    const instance = forms[scope];
    const changed = final.payload as Partial<F>;
    const values = instance?.getFieldsValue([scope])[scope] as F;

    switch (scope) {
      case 'filters': {
        // Ищем наличие зависимостей между фильтрами
        // чтобы очистить slave фильтр если был
        // изменен его master
        const patched = mapValues(values, (v, k) => {
          if (!dependencies[k]) return v;

          if (dependencies[k].includes(touched)) {
            instance.setFieldValue([scope, k], undefined);

            return undefined;
          }

          return v;
        }) as F;

        onFilterValuesChange?.(changed, patched);

        break;
      }

      case 'sorters': {
        // Сбрасываем другие сортировки
        // тк одновременно может быть применена
        // только одна сортировка
        const patched = mapValues(values, (v, k) => {
          if (k === touched) return v;

          return 'default';
        }) as F;

        // Обновляем инстанс формы для сортировок
        instance.setFieldValue([scope], patched);
        // Вызываем колбэк с обновленными параметрами
        onSorterValuesChange?.(changed, patched);

        break;
      }

      case 'search': {
        // FIXME: Поправить типизацию
        onSearchValueChange?.(
          changed as unknown as { search: string },
          changed.search || '',
        );

        return;
      }

      default:
        break;
    }
  });
};
