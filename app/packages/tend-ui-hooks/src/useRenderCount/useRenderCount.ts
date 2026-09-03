import React from 'react';

/**
 * Позволяет отслеживать количество отрисовок компонента
 */
export const useRenderCount = (name: string) => {
  const count = React.useRef(0);
  if (process.env.NODE_ENV === 'production') return;
  count.current++;

  console.warn(`[${name}] отрендерился ${count.current} раз`);

  return count.current;
};
