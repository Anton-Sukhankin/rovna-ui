import { State as CentrifugoState } from 'centrifuge';
import { create } from 'zustand';

import { initialFilters } from '@notifications/shared/consts/filters';
import { NotificationsTypes } from '@notifications/shared/consts/notifications-types';

import { State } from './types';

export const useStore = create<State>(set => ({
  connection: CentrifugoState.Disconnected,
  setConnection: (connection: CentrifugoState) => set({ connection }),

  screen: null,
  setScreen: screen => set({ screen }),

  checked: new Set<number>(),
  toggleChecked: id =>
    set(state => {
      const checked = new Set(state.checked);
      if (checked.has(id)) {
        checked.delete(id);
      } else {
        checked.add(id);
      }

      return { checked };
    }),

  toggleCheckedAll: ids =>
    set(state => ({
      checked: state.checked.size !== ids.length ? new Set(ids) : new Set(),
    })),

  type: NotificationsTypes.IMPORTANT,
  setType: type => set({ type, checked: new Set() }),

  search: '',
  setSearch: search => set({ search, checked: new Set() }),

  settingsSaveToken: '',

  module: null,
  setModule: module => set({ module: structuredClone(module) }),
  setModuleWithInitials: module =>
    set({
      module: structuredClone(module),
      settingsSaveToken: module
        ? JSON.stringify(structuredClone(module).profile_notification_settings)
        : '',
    }),

  filters: initialFilters,
  setFilters: filters => set({ filters, checked: new Set() }),
}));
