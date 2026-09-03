import React from 'react';

export const UNSTABLE_useWidth = () => {
  const ref = React.useRef<HTMLElement | null>(null);
  const [width, setWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    setWidth(ref.current.getBoundingClientRect().width);
  }, []);

  return [width] as const;
};
