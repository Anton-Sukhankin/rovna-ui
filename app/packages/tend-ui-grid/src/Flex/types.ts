import React from 'react';
import AntFlex from 'antd-core/es/flex';
import { MarginProperties, PaddingProperties } from '@rovna-ui/styling';

export type FlexRef = React.ElementRef<typeof AntFlex>;
export type FlexProps = React.ComponentPropsWithoutRef<typeof AntFlex> &
  MarginProperties &
  PaddingProperties;
