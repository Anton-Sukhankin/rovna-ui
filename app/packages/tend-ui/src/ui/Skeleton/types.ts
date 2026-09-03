import {
  LayoutProperties,
  MarginProperties,
  PaddingProperties,
} from '@rovna-ui/styling';
import React from 'react';

import { Size } from '@rovna-internal/components/types/Size';

export type SkeletonProps = MarginProperties &
  PaddingProperties &
  LayoutProperties & {
    skeleton?: boolean;
    size?: Size;
    display?: React.CSSProperties['display'];
    borderRadius?: React.CSSProperties['borderRadius'];
    backgroundColor?: string;
    className?: string;
  };
