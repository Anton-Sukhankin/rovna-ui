import React from 'react';
import AntCard, { CardProps as AntCardProps } from 'antd-core/es/card';

export type CardRef = React.ElementRef<typeof AntCard>;
export type CardProps = AntCardProps;
