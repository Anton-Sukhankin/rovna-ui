type DebouncedFunction<T extends (...args: any[]) => any> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) & {
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
};

declare function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait?: number,
  options?: {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
  },
): DebouncedFunction<T>;

export = debounce;
