import React from 'react';

export type ListProps = {
  items: string[];
  children?: React.ReactNode;
  onScroll?: React.UIEventHandler<HTMLElement>;
};
