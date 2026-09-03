import { declOfNum } from '@notifications/shared/lib/utils/declOfNum';

export const confirmationMessage = (count: number, isArchive: boolean) =>
  isArchive
    ? `${declOfNum(count, [
        'Уведомление возвращено',
        'Уведомления возвращены',
        'Уведомления возвращены',
      ])} из архива`
    : `${declOfNum(count, [
        'Уведомление перемещено',
        'Уведомления перемещены',
        'Уведомления перемещены',
      ])} в архив`;
