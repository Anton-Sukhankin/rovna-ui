export type NotificationType = 'IMPORTANT' | 'INFORMATION';
export type NotificationTypeExtended = NotificationType | 'ARCHIVE';
export type NotificationTypeSenderType = 'email' | 'web' | 'push';

export type NotificationTypeEntity = {
  type: NotificationType;
  is_active: boolean;
};

export type NotificationTypeSenderEntity = {
  type: NotificationTypeSenderType;
  is_active: boolean;
};

export type NotificationsQueryOptions = {
  page?: number;
  type?: NotificationTypeExtended;
  search?: string;
  module?: Array<string>;
  dtStart?: string;
  dtEnd?: string;
  contract?: Array<string>;
};

export interface Notification {
  id: number;
  title: string;
  type: NotificationType;
  message_body: string;
  module_sfb: string;
  module_url: string;
  module_title: string;
  timestamp: string;
  dt_read: string | null;
  dt_archive: string | null;
  dt_delete: string | null;
}

export type NotificationsCount = {
  [key in NotificationType]: number;
};

export type Filters<T> = {
  date?: [T, T];
  module?: Array<string>;
  contract?: Array<string>;
};

export type FiltersPreset<T> = {
  name: string;
  filters: Partial<Filters<T>>;
};

// CONTRACT
export type Contract = {
  id: number;
  number: string;
  deleted: Date;
  actual_number: string;
  date: Date;
  terminated: boolean;
  digital_signature: boolean;
  contractor_id: number;
  contractor_name: string;
};

// MODULE
export interface Module {
  id: number;
  name: string;
  description: string;
  is_personal: boolean;
  is_enabled: boolean;
  profile_notification_settings: Settings;
}

export interface ModuleToBackend {
  module_id: number;
  name: string;
  description: string;
  is_personal: boolean;
  is_enabled: boolean;
  notification_settings: Settings;
}

// SETTINGS
export type SettingsModule = {
  id: number;
  sfb: string;
  title: string;
  url: string;
};

export type Settings = {
  sender_types: NotificationTypeSenderEntity[];
  notification_types: NotificationTypeEntity[];
};

export type SettingsPatchResponse = {
  id: number;
  settings: Settings;
};

export type SettingsResponse = {
  id: number;
  settings: Settings;
};
