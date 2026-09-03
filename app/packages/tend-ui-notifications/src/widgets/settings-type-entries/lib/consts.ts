import type { NotificationType } from '@notifications/api/types';
import { NotificationsTypes } from '@notifications/shared/consts/notifications-types';

export const typeEntriesDescription: Record<NotificationType, string> = {
  [NotificationsTypes.IMPORTANT]: 'Получать важные уведомления',
  [NotificationsTypes.INFORMATION]: 'Получать информационные уведомления',
};
