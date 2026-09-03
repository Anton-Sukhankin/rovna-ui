import { RefObject, useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  /**
   * `ref` элемента, по которому отслеживается клик
   */
  ref: RefObject<T>,
  /**
   * Функция-колбэк, вызываемая вне клика элемента
   */
  onClick: (event: MouseEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!ref.current || ref.current.contains(target)) return;
      onClick(event);
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, onClick]);
};
