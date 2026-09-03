const options: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'UTC',
};

export const formatTimestamp = (timestamp: Date | string) => {
  const date = new Date(timestamp);

  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return `Сегодня, ${date.toLocaleTimeString('ru-RU', options)}`;
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return `Вчера, ${date.toLocaleTimeString('ru-RU', options)}`;
  }

  return date.toLocaleDateString('ru-RU', options);
};
