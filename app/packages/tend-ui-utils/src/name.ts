/**
 * Возвращает наименование файла без его расширения
 */
export const name = (name: string): string => {
  return name.replace(/\.[^/.]+$/, '');
};
