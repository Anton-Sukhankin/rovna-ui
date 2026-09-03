import { useCallbackRef } from '@rovna-ui/hooks';
import React from 'react';

export const useDoubleClick = <TEvent extends React.MouseEvent>({
  onClick,
  onDoubleClick,
  delay = 300,
}: {
  onClick?: (e: TEvent) => void;
  onDoubleClick?: (e: TEvent) => void;
  delay?: number;
}) => {
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timeout.current === null) return;
      clearTimeout(timeout.current);
      timeout.current = null;
    },
    [],
  );

  return useCallbackRef((e: TEvent) => {
    if (timeout.current === null) {
      timeout.current = setTimeout(() => {
        onClick?.(e);
        timeout.current = null;
      }, delay);
    } else {
      onDoubleClick?.(e);
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  });
};
