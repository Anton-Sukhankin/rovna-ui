import React from 'react';

export const useForwardRef = <T,>(
  ref: React.ForwardedRef<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial: any = null,
) => {
  const _ref = React.useRef<T | null>(initial);

  React.useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(_ref.current);
    } else {
      _ref.current = ref.current;
    }
  });

  return _ref;
};
