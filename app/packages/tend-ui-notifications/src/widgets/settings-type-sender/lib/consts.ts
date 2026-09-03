import type { NotificationTypeSenderType } from '@notifications/api/types';

export const typeSenderEntriesDescription: Record<NotificationTypeSenderType, string> = {
  email: 'Получать уведомления на почту',
  web: 'Получать web-уведомления',
  push: 'Получать Push-уведомления',
};
