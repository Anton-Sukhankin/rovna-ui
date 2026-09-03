import { declOfNum } from '@notifications/shared/lib/utils/declOfNum';

export const confirmationMessage = (count: number) =>
  `${declOfNum(count, [
    'Уведомление прочитано',
    'Уведомления прочитаны',
    'Уведомления прочитаны',
  ])}`;
