import dayjs from 'dayjs';
import { useCallback } from 'react';

import { Settings } from '@notifications/api/types';

import * as Selectors from './selectors';
import { useStore } from './store';
import { StoreFilter } from './types';

export const useConnection = () => useStore(Selectors.connection);
export const useSetConnection = () => useStore(Selectors.setConnection);

export const useScreen = () => {
  const screen = useStore(Selectors.view);
  const setScreen = useStore(Selectors.setView);

  return { screen, setScreen };
};

export const useNotificationsChecked = () => useStore(Selectors.checked);
export const useNotificationsToggleChecked = () => useStore(Selectors.toggleChecked);
export const useNotificationsToggleCheckedAll = () =>
  useStore(Selectors.toggleCheckedAll);

export const useNotificationsType = () => useStore(Selectors.type);
export const useNotificationsSetType = () => useStore(Selectors.setType);

export const useNotificationsSearch = () => useStore(Selectors.search);
export const useNotificationsSetSearch = () => useStore(Selectors.setSearch);

export const useCurrentModule = () => {
  const currentModule = useStore(Selectors.module);
  const setCurrentModule = useStore(Selectors.setModuleWithInitials);

  const clearCurrentModule = useCallback(() => {
    setCurrentModule(null);
  }, [setCurrentModule]);

  return { currentModule, setCurrentModule, clearCurrentModule };
};

export const useCurrentModuleSettings = () => {
  const module = useStore(Selectors.module);
  const settings = module?.profile_notification_settings;
  const setSettings = useStore(Selectors.setModule);

  const changeSettings = <K extends keyof Settings>(
    groupKey: K,
    type: Settings[K][0]['type'],
    status: boolean,
  ) => {
    if (!settings) return;

    const notificationsGroup = <{ type: string; is_active: boolean }[]>settings[groupKey];

    const changedElem = notificationsGroup.find(item => item.type === type);
    if (changedElem) {
      changedElem.is_active = status;
    }

    setSettings({
      ...module,
      profile_notification_settings: {
        ...module?.profile_notification_settings,
        [groupKey]: notificationsGroup,
      },
    });
  };

  return { settings, changeSettings };
};

export const useSaveSettingsState = () => {
  const currentModule = useStore(Selectors.module);
  const saveToken = useStore(Selectors.saveToken);
  const settingsToken = JSON.stringify(currentModule?.profile_notification_settings);
  const isSavedSettings = settingsToken === saveToken;

  return { isSavedSettings };
};

export const useFilters = () => {
  const filters = useStore(Selectors.filters);

  return {
    ...filters,
    ...(filters?.date && {
      date: [dayjs(filters.date[0]), dayjs(filters.date[1])],
    }),
  } as StoreFilter;
};
export const useSetFilters = () => useStore(Selectors.setFilters);
