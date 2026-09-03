import type { NotificationType } from '@notifications/api/types';
import { notificationsTypesName } from '@notifications/shared/consts/notifications-types';

export const tooltipOverlay = (isArchived: boolean) =>
  isArchived ? 'Вернуть из архива' : 'Поместить в архив';

export const confirmationMessage = (isArchived: boolean, type: NotificationType) =>
  isArchived
    ? `Уведомление перемещено в\u00A0категорию «${notificationsTypesName[type]}»`
    : 'Уведомление перемещено в\u00A0архив';
