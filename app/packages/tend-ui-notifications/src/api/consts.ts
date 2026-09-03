import { NOTIFICATIONS_URL } from '@notifications/shared/consts/urls';

export const urls = {
  modules: `${NOTIFICATIONS_URL}/api/sn/user-settings/modules`,
  modules_notifications_settings: `${NOTIFICATIONS_URL}/api/sn/modules/with-profile-notification-settings/`,
  module_update: `${NOTIFICATIONS_URL}/api/sn/user-settings/profile-notification-settings/`,
  settings: `${NOTIFICATIONS_URL}/api/sn/user-settings/`,
  filtersPresets: `${NOTIFICATIONS_URL}/api/sn/user-settings/filters`,
  contracts: `${NOTIFICATIONS_URL}/api/sn/profile/contracts`,
  notifications: `${NOTIFICATIONS_URL}/api/sn/notifications/`,
  read: `${NOTIFICATIONS_URL}/api/sn/notifications/read`,
  archive: `${NOTIFICATIONS_URL}/api/sn/notifications/archive-notifications`,
  unarchive: `${NOTIFICATIONS_URL}/api/sn/notifications/unarchive-notifications`,
  delete: `${NOTIFICATIONS_URL}/api/sn/notifications/delete-notifications`,
  undelete: `${NOTIFICATIONS_URL}/api/sn/notifications/undelete-notifications`,
  unreadCount: `${NOTIFICATIONS_URL}/api/sn/notifications/count-of-unread`,
};
