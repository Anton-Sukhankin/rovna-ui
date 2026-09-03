import type { NotificationType } from '@notifications/api/types';

export const NotificationsTypes = {
  IMPORTANT: 'IMPORTANT',
  INFORMATION: 'INFORMATION',
  ARCHIVE: 'ARCHIVE',
} as const;

export const notificationsTypesName: Record<NotificationType, string> = {
  [NotificationsTypes.IMPORTANT]: 'Важные',
  [NotificationsTypes.INFORMATION]: 'Информационные',
};
