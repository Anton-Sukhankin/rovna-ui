import React from 'react';

export type ImageLoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export const useImageLoadingStatus = (src?: string) => {
  const [status, setStatus] = React.useState<ImageLoadingStatus>('idle');

  React.useLayoutEffect(() => {
    if (!src) {
      setStatus('error');

      return;
    }

    let isMounted = true;
    const image = new window.Image();

    setStatus('loading');
    image.onload = () => {
      if (!isMounted) return;
      setStatus('success');
    };
    image.onerror = () => {
      if (!isMounted) return;
      setStatus('error');
    };
    image.src = src;

    return () => {
      isMounted = false;
    };
  }, [src]);

  return status;
};
