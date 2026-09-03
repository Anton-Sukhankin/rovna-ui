import dayjs, { Dayjs } from 'dayjs';

import type { FiltersPreset } from '@notifications/api/types';

type InputType = Dayjs | string;
type ReturnType<T extends InputType> = T extends string ? Dayjs : string;

const dateFormat = <T extends InputType>(date: T): ReturnType<T> =>
  (typeof date === 'string'
    ? dayjs(date, 'DD.MM.YYYY')
    : date.format('DD.MM.YYYY')) as ReturnType<T>;

export const mapPresets = <T extends InputType>(
  presets: Array<FiltersPreset<T>>,
): Array<FiltersPreset<ReturnType<T>>> =>
  presets.map(({ name, filters }) => ({
    name,
    filters: {
      ...(filters.module && { module: filters.module }),
      ...(filters.contract && { contract: filters.contract }),
      ...(filters.date && {
        date: [dateFormat(filters.date[0]), dateFormat(filters.date[1])],
      }),
    },
  }));
