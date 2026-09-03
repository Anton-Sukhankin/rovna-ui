/**
 * Функция для проверки превышения заданного значение
 * максимального в процентном соотношении
 *
 * @param value Проверяемое значение
 * @param max Максимально-допустимое значение
 * @param percent Процент превышения
 * @returns Превышает ли `a` значение `b` в процентном соотношении
 */
export const isExceed = (value: number, max: number, percent: number) => {
  const result = (value / max) * 100;

  return result >= percent;
};
