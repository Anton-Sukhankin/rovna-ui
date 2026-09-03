declare function throttle<T extends (...args: any[]) => any>(
  fn: T,
  wait?: number,
  options?: { leading?: boolean; trailing?: boolean },
): T & { cancel: () => void; flush: () => ReturnType<T> | undefined };

export = throttle;
