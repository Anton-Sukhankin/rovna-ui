import type { StoreFilter } from '@notifications/app/store/types';

export const initialFilters: StoreFilter = {
  preset: undefined,
  contract: undefined,
  date: undefined,
  module: undefined,
};

export const filtersLabels: Record<keyof StoreFilter, string> = {
  contract: 'Договор',
  date: 'Дата',
  module: 'Сервис',
  preset: 'Сохранённые фильтры',
};
