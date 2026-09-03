import React from 'react';

export type ImageProps = React.ComponentPropsWithoutRef<'img'> & {
  fit?: 'contain' | 'cover';
};
