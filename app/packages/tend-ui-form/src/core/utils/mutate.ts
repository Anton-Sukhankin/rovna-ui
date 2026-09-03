import { Any } from '@rovna-ui/types';

export const mutate = (object: Any, path: string[], value: Any, overwrite = true) => {
  path.reduce((acc, key, index) => {
    const isLast = index === path.length - 1;
    if (isLast) {
      if (overwrite) {
        acc[key] = value;
      } else if (acc[key] === undefined) {
        acc[key] = value;
      }
    } else {
      // Если промежуточный объект отсутствует, создаем пустой объект
      if (!acc[key] || typeof acc[key] !== 'object') {
        acc[key] = {};
      }
    }

    return acc[key];
  }, object);

  return object;
};
