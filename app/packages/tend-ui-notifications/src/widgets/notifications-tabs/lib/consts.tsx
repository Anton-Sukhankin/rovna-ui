import {
  NotificationsTypes,
  notificationsTypesName,
} from '@notifications/shared/consts/notifications-types';

export const tabItems = [
  { label: notificationsTypesName.IMPORTANT, key: NotificationsTypes.IMPORTANT },
  { label: notificationsTypesName.INFORMATION, key: NotificationsTypes.INFORMATION },
  { label: 'Архив', key: NotificationsTypes.ARCHIVE },
];
