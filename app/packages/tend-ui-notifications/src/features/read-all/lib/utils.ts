import { declOfNum } from '@notifications/shared/lib/utils/declOfNum';

export const dialogContent = (count: number) =>
  `${count.toLocaleString()} ${declOfNum(count, [
    'уведомление будет прочитано',
    'уведомления будут прочитаны',
    'уведомлений будут прочитаны',
  ])}.`;
