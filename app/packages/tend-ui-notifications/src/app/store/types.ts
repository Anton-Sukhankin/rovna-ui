import dayjs from 'dayjs';
import { State as CentrifugoState } from 'centrifuge';

import { Filters, Module, NotificationTypeExtended } from '@notifications/api/types';

export type Screen = 'list' | 'service-settings' | 'filters' | 'services';

export type StoreFilter = Filters<dayjs.Dayjs> & {
  preset?: string;
};

export type State = {
  connection: CentrifugoState;
  setConnection: (connection: CentrifugoState) => void;

  screen: Screen | null;
  setScreen: (state: Screen | null) => void;

  checked: Set<number>;
  toggleChecked: (id: number) => void;
  toggleCheckedAll: (ids: number[]) => void;

  type: NotificationTypeExtended;
  setType: (type: NotificationTypeExtended) => void;

  search: string;
  setSearch: (search: string) => void;

  settingsSaveToken: string;

  module: Module | null;
  setModule: (state: Module | null) => void;
  setModuleWithInitials: (state: Module | null) => void;

  filters: Partial<StoreFilter> | undefined;
  setFilters: (filters: StoreFilter) => void;
};
