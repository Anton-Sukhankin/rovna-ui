import React from 'react';

export type DndAreaProps = Pick<
  React.ComponentProps<'div'>,
  'aria-invalid' | 'aria-required'
> & {
  limit?: string;
  description?: string;
};
