import type { NotificationTypeSenderType } from '@notifications/api/types';

export const NotificationTypeSenders: Record<NotificationTypeSenderType, string> = {
  email: 'Электронная почта',
  web: 'Веб-уведомления',
  push: 'Push-уведомления',
} as const;
