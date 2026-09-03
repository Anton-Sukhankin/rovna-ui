import { MarginProperties, PaddingProperties } from '@rovna-ui/styling';
import React from 'react';

export type HeaderProps = React.ComponentPropsWithoutRef<'header'> &
  MarginProperties &
  PaddingProperties & {
    sticky?: boolean;
  };
