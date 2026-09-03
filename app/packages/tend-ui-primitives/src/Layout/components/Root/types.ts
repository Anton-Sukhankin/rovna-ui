import React from 'react';

export type RootProps = React.ComponentPropsWithoutRef<'div'> & {
  size?: 'large' | 'medium' | 'small';
};
