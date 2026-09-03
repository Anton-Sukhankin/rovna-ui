import { LayoutProperties } from '@rovna-ui/styling';
import React from 'react';

export type ImageProps = React.ComponentPropsWithoutRef<'img'> &
  LayoutProperties & {
    rootClassName?: string;
  };
