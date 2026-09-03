import React from 'react';
import AntSegmented, {
  SegmentedProps as AntSegmentedProps,
} from 'antd-core/es/segmented';

import { BadgeProps } from '@rovna-internal/components/primitives/Badge';

export type SegmentedRef = React.ElementRef<typeof AntSegmented>;
type AntSegmentedOption = AntSegmentedProps['options'][number];
type Option = AntSegmentedOption & {
  badge?: Omit<BadgeProps, 'padding'>;
};
export type SegmentedProps = Omit<AntSegmentedProps, 'ref' | 'size' | 'options'> & {
  options: Option[];
};
