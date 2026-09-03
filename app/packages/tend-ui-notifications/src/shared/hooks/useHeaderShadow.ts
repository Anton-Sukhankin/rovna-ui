/* Shadow Effect */
import { useEffect, useRef } from 'react';

export const useHeaderShadow = () => {
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollable = scrollableRef.current;
    const headerContainer = document.querySelector(`.rovna-ui-notifications-header`);

    const handleShadow = () => {
      if (!scrollable) return;

      const scrollY = Math.ceil(scrollable.scrollTop) || 0;
      headerContainer?.classList.toggle('shadow', scrollY > 0);
    };

    scrollable?.addEventListener('scroll', handleShadow);

    return () => {
      scrollable?.removeEventListener('scroll', handleShadow);
      headerContainer?.classList.remove('shadow');
    };
  }, []);

  return { scrollableRef };
};
