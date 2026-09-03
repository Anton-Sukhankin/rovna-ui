import React from 'react';

/**
 * Позволяет подписываться на изменение ширины экрана
 */
export const useMediaQuery = (query: string) => {
  const [isMatch, setIsMatch] = React.useState(false);
  const [mediaQueryList, setMediaQueryList] = React.useState<MediaQueryList | null>(null);

  React.useEffect(() => {
    const list = window.matchMedia(query);
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [query]);

  React.useEffect(() => {
    if (!mediaQueryList) return;

    const onChange = (e: MediaQueryListEvent) => {
      setIsMatch(e.matches);
    };

    mediaQueryList.addEventListener('change', onChange);

    return () => {
      mediaQueryList.removeEventListener('change', onChange);
    };
  }, [mediaQueryList]);

  return isMatch;
};
