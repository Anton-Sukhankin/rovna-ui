import React from 'react';

export const useRenderCount = (name?: string) => {
  const count = React.useRef(0);
  if (process.env.NODE_ENV === 'production') return;
  count.current++;

  if (name) {
    console.warn(`[${name}] has rendered ${count.current} times`);
  }

  return count.current;
};
