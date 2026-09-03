/**
 * Позволяет получить значение ключа объекта по его значению
 */
export const key = <M extends object = object>(map: M, value: M[keyof M]) => {
  const keys = Object.keys(map);
  const finding = keys.find(key => {
    const k = key as keyof M;

    return map[k] === value;
  });

  if (!finding) return null;

  return finding as keyof M;
};
