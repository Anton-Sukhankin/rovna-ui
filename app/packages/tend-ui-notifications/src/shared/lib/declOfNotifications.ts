import { declOfNum } from './utils/declOfNum';

export const declOfNotifications = (count: number) => {
  return `${count} ${declOfNum(count, ['уведомление', 'уведомления', 'уведомлений'])}`;
};
