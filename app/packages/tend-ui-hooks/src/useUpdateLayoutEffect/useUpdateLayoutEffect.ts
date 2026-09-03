import React from 'react';

/**
 * Хук вызывается при изменении deps, но пропускает первый маунтинг
 */
export const useUpdateLayoutEffect = (
  effect: React.EffectCallback,
  deps?: React.DependencyList,
) => {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;

      return;
    }

    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
