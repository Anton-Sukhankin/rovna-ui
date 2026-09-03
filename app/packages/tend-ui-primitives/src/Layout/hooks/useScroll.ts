import React from 'react';
import { useCallbackRef } from '@rovna-ui/hooks';

const __NODES = new Map<string, React.MutableRefObject<HTMLElement | null>>();

/**
 * Хук для скроллинга страницы
 */
export const useScroll = () => {
  const register = useCallbackRef(
    (key: string, target: React.MutableRefObject<HTMLElement | null>) => {
      __NODES.set(key, target);
    },
  );

  const scroll = useCallbackRef((key: string) => {
    const instance = __NODES.get(key);
    if (!instance?.current) return;
    instance.current.scrollIntoView({ behavior: 'smooth' });
  });

  return { register, scroll };
};
