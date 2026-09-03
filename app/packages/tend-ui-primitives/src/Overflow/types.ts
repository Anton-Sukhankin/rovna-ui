import React from 'react';

export type OverflowProps<T = unknown> = {
  className?: string;
  items: T[];
  render?: (item: T) => React.ReactNode;
  overflown?: (items: T[]) => React.ReactNode;
};
