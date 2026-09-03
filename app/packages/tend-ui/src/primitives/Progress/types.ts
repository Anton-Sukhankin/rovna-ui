import React from 'react';
import AntProgress, { ProgressProps as AntProgressProps } from 'antd-core/es/progress';

export type ProgressRef = React.ElementRef<typeof AntProgress>;
export type ProgressProps = Omit<AntProgressProps, 'size'> & {
  size?: number | [number | string, number] | 'medium' | 'small';
};
