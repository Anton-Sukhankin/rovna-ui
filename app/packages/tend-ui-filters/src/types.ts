import { DebounceOptions } from '@rovna-ui/hooks';
import { FormInstance, FormProps } from '@rovna-ui/components/components/Form';
import { ButtonProps, DrawerProps } from '@rovna-ui/components/primitives';

import { FilterConfig, FilterPreset, FilterValue } from './core/types';

export type CoreFiltersProps<T extends FilterValue = FilterValue> = {
  /**
   * Настройка дебаусинга для функции-колбэка `onFilterValuesChange`
   */
  debounce?: boolean | DebounceOptions;
  /**
   * Значение фильтров
   */
  value?: T;
  /**
   * Значение фильтров по умолчанию
   */
  defaultValue?: T;
  /**
   * Массив-конфигураций фильтров
   */
  filters: FilterConfig[];
  /**
   * @deprecated Низкоуровневое API, не использовать в продакшене
   * Только для нужд команды дизайн-системы
   */
  form?: FormInstance<T>;
  /**
   * @deprecated Низкоуровневое API, не использовать в продакшене
   * Только для нужд команды дизайн-системы
   */
  INTERNAL_scope?: string;
  /**
   * @deprecated Низкоуровневое API, не использовать в продакшене
   * Только для нужд команды дизайн-системы
   */
  name?: FormProps['name'];
  /**
   * @deprecated
   */
  resetAllButtonProps?: Omit<ButtonProps, 'ref'>;
  /**
   * Вызывается при изменении фильтров
   * @param changed - измененный фильтр
   * @param values - все текущие выбранные фильтры
   */
  onFilterValuesChange?: (changed: Partial<T>, values: T) => void;
  /**
   * Вызывается при клике кнопки "Применить"
   * @param state - текущее состояние выбранных фильтров
   */
  onFilterValuesFinish?: (state: T) => void;
  /**
   * Вызывается при сбросе конкретного фильтра
   * @internal Не для публичного использования
   * @deprecated Устарел,  используйте просто `onFilterValuesChange`
   */
  onFilterReset?: (name: string) => void;
  /**
   * Вызывается при нажатии "Сбросить все фильтры"
   */
  onFiltersReset?: () => void;

  /**
   * Уникальный ключ для `localStorage` для сохранения пресетов
   */
  localStorage?: string;
  /**
   * Отображать ли пресеты
   */
  showPresets?: boolean;
  /**
   * Пресеты
   */
  presets?: FilterPreset[];
  /**
   * Пресеты по умолчанию
   */
  defaultPresets?: FilterPreset[];
  /**
   * Вызывается при изменении пресетов
   */
  onPresetsChange?: (presets: FilterPreset[]) => void;
  /**
   * Вызывается при создании пресета
   */
  onPresetSave?: (saved: FilterPreset) => void;
  /**
   * Вызывается при редактировании пресета
   */
  onPresetEdit?: (edited: FilterPreset) => void;
  /**
   * Вызывается при удалении пресета
   */
  onPresetRemove?: (removed: FilterPreset) => void;
  /**
   * Вызывается при применении пресета
   */
  onPresetApply?: (preset: FilterPreset) => void;
};
export type FiltersProps<T extends FilterValue = FilterValue> = CoreFiltersProps<T> & {
  /**
   * Отображать ли кнопку ручного применения фильтров
   * @default false
   */
  showApplyButton?: boolean;
  /**
   * Индикатор загрузки
   */
  loading?: boolean;
  /**
   * Заголовок
   */
  title?: DrawerProps['title'];
  /**
   * Открыт/закрыт
   */
  open?: DrawerProps['open'];
  /**
   * Размонтировать компонент при закрытии
   */
  destroyOnClose?: boolean;
  /**
   * Функция вызывается при закрытии `Drawer`
   */
  onClose?: DrawerProps['onClose'];
};
