import { Title } from '@rovna-ui/components/typography';
import React, { useCallback } from 'react';
import type { CheckboxOptionType } from '@rovna-ui/components/primitives';
import type { FilterConfig } from '@rovna-ui/components/components';

import {
  useContractsQuery,
  useFiltersPresetsQuery,
  useModulesInfoQuery,
} from '@notifications/api/hooks';
import { filtersLabels, initialFilters } from '@notifications/shared/consts/filters';
import { useSetFilters } from '@notifications/app/store/hooks';
import type { StoreFilter } from '@notifications/app/store/types';

import { PresetFilterOption } from '../ui/PresetFilterOption';

export const useFiltersConfig = () => {
  const { modules, modulesLoading } = useModulesInfoQuery();
  const { contracts, contractsLoading } = useContractsQuery();
  const { presets, presetsLoading } = useFiltersPresetsQuery();

  const setFilters = useSetFilters();

  const config: FilterConfig[] = [
    {
      id: 'preset',
      name: 'preset',
      label: (
        <Title level='h6' margin={0}>
          Сохранённые фильтры
        </Title>
      ),
      component: {
        loading: presetsLoading,
        filterOption: true,
        optionRender: (data: CheckboxOptionType) => <PresetFilterOption data={data} />,
        placeholder: 'Введите название фильтра',
        component: 'radio-group-search',
        options: presets.map(f => ({ value: f.name, label: f.name })),
      },
    },
    {
      id: 'date',
      name: 'date',
      label: (
        <Title level='h6' margin={0}>
          {filtersLabels.date}
        </Title>
      ),
      component: { component: 'range-picker' },
    },
    {
      id: 'module',
      name: 'module',
      label: (
        <Title level='h6' margin={0}>
          {filtersLabels.module}
        </Title>
      ),
      component: {
        loading: modulesLoading,
        filterOption: true,
        placeholder: 'Введите название сервиса',
        component: 'checkbox-group-search',
        options: modules,
      },
    },
    {
      id: 'contract',
      name: 'contract',
      label: (
        <Title level='h6' margin={0}>
          {filtersLabels.contract}
        </Title>
      ),
      component: {
        loading: contractsLoading,
        filterOption: true,
        placeholder: 'Введите номер договора',
        component: 'checkbox-group-search',
        options: contracts,
      },
    },
  ];

  const onValuesChange = useCallback(
    <K extends StoreFilter>(changedValue: Partial<K>, fieldsValues: K) => {
      const filtersPreset = presets.find(
        preset => preset.name === changedValue.preset,
      )?.filters;

      setFilters({
        ...initialFilters,
        ...(changedValue.preset ? filtersPreset : fieldsValues),
        preset: changedValue.preset,
      });
    },
    [presets, setFilters],
  );

  return { config, onValuesChange };
};
