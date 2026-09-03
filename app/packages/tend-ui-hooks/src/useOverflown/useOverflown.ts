import React from 'react';

const isOverflown = (element: HTMLElement | null) => {
  if (!element) return false;

  return (
    element.offsetHeight < element.scrollHeight ||
    element.offsetWidth < element.scrollWidth
  );
};

export const UNSTABLE_useOverflown = () => {
  const ref = React.useRef<HTMLElement | null>(null);
  const [overflown, setOverflown] = React.useState(false);

  React.useLayoutEffect(() => {
    if (isOverflown(ref.current)) {
      setOverflown(true);

      return;
    }

    setOverflown(false);
  }, []);

  return [overflown, ref] as const;
};
