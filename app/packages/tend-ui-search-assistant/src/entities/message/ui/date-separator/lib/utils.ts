export const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
};
