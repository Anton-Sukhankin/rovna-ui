import React from 'react';

export type DragHandleProps = {
  /** Доступное имя кнопки перетаскивания. */
  ['aria-label']?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};
