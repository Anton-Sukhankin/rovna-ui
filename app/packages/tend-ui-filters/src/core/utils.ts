import { Any, GenericObject } from '@rovna-ui/types';
import { entries, fromEntries, isString } from '@rovna-ui/utils';
import dayjs from 'dayjs';

import { FilterPreset } from './types';

export const patch = (
  previous: GenericObject = {},
  next: GenericObject,
  fallback: string | undefined = undefined,
): GenericObject => {
  const final = { ...previous, ...next };
  const result = Object.entries(final).map(([key]) => {
    const v = next[key];

    if (v) return [key, v];

    return [key, fallback];
  });
  const updated = Object.fromEntries(result);

  return updated;
};

export const mapSavedPresetsToPresets = (presets: FilterPreset[]): FilterPreset[] =>
  presets.map(preset => {
    /**
     * Так как дата сохраняется в localStorage в виде строки, то ее нужно
     * преобразовать обратно в объект dayjs/momentjs для корректной
     * работы компонентов
     */
    const value = entries<Any>(preset.value).map(pair => {
      const [key, value] = pair;

      const isValidIsoDate = dayjs(value, 'YYYY-MM-DD').isValid();

      // Если строка и она соответствует маске валидной даты
      if (isString(value) && isValidIsoDate) {
        return [key, dayjs(value)];
      }

      if (Array.isArray(value)) {
        const transformed = value.map((v: string) => {
          const isValidIsoDate = dayjs(v, 'YYYY-MM-DD').isValid();

          return typeof v === 'string' && isValidIsoDate ? dayjs(v) : v;
        });

        return [key, transformed];
      }

      return pair;
    });

    return { ...preset, value: fromEntries<Any>(value) };
  });
