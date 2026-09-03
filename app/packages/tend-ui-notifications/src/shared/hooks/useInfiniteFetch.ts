import { useCallback, useRef } from 'react';

type UseInfiniteFetchParams = {
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
};

export const useInfiniteFetch = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseInfiniteFetchParams) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchNextData = useCallback(() => {
    const container = containerRef.current;

    if (!container || !hasNextPage || isFetchingNextPage) return;

    const availableFetch =
      Math.ceil(container.scrollTop + container.clientHeight) >= container.scrollHeight;

    if (availableFetch) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    containerRef,
    fetchNextData,
  };
};
