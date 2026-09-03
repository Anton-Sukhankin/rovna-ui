import React from 'react';

export type CardProps = {
  hovered?: boolean;
  selected?: boolean;
  disabled?: boolean;
  before?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};
