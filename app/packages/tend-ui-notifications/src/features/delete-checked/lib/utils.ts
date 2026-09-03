import { declOfNum } from '@notifications/shared/lib/utils/declOfNum';

export const confirmationText = (count: number) =>
  `${declOfNum(count, ['Уведомление', 'Уведомления', 'Уведомления'])} ${declOfNum(count, [
    'удалено',
    'удалены',
    'удалены',
  ])}`;

export const dialogContent = (count: number) =>
  `${count.toLocaleString()} ${declOfNum(count, [
    'выбранное уведомление будет удалено',
    'выбранных уведомления будут удалены',
    'выбранных уведомлений будут удалены',
  ])} безвозвратно.`;
