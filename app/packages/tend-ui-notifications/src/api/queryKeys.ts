import { NotificationsQueryOptions } from './types';

export const queryKeys = {
  base: ['@rovna-ui/notifications'],

  listBase: () => [...queryKeys.base, 'list'] as const,

  list: (params: Omit<NotificationsQueryOptions, 'page'>) =>
    [...queryKeys.listBase(), params] as const,

  unreadCount: () => [...queryKeys.base, 'unread-count'] as const,

  contracts: () => [...queryKeys.base, 'contracts'] as const,

  modules: () => [...queryKeys.base, 'modules'] as const,

  settings: () => [...queryKeys.base, 'settings'] as const,

  filtersPresets: () => [...queryKeys.base, 'filters-presets'] as const,
};
