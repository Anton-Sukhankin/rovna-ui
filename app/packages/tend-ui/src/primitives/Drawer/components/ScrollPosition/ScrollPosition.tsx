import React from 'react';

import { Box } from '@rovna-internal/components/grid/Box';

type Position = 'initial' | 'top' | 'middle' | 'bottom';

const ScrollPosition = ({
  children,
  onScrollPositionChange,
}: React.PropsWithChildren<{
  onScrollPositionChange?: (position: Position) => void;
}>) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<Position>('initial');

  React.useEffect(
    () => onScrollPositionChange?.(position),
    [onScrollPositionChange, position],
  );

  React.useEffect(() => {
    if (!ref) return;

    const drawerScrollableBody = ref.current?.closest('.rovna-ui-drawer-body');
    if (!drawerScrollableBody) return;
    const isScrollable =
      drawerScrollableBody.scrollHeight > drawerScrollableBody.clientHeight;

    if (!isScrollable) return;

    function onScroll(event: Event) {
      const e = event.target as HTMLDivElement;
      if (!e) return;
      const top = e.scrollTop;
      const height = e.scrollHeight - e.offsetHeight;

      if (top === 0) {
        setPosition('top');

        return;
      }

      if (top > 0 && top < height) {
        setPosition('middle');

        return;
      }

      if (top === height) {
        setPosition('bottom');

        return;
      }
    }

    drawerScrollableBody.addEventListener('scroll', onScroll);
    onScrollPositionChange?.('top');

    return () => {
      drawerScrollableBody.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className='rovna-ui-drawer-scroll-position' ref={ref} $height='100%'>
      {children}
    </Box>
  );
};

export { ScrollPosition };
