/**
 * Возвращает только цифры из строки
 */
export const digits = (value: string): string => {
  const cleared = value.replace(/\D/g, '');

  return cleared;
};
