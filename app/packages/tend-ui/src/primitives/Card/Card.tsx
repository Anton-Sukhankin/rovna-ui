import React from 'react';
import AntCard from 'antd-core/es/card';
import Grid from 'antd-core/es/card/Grid';
import Meta from 'antd-core/es/card/Meta';

import { CardProps, CardRef } from './types';

const Card = Object.assign(
  React.forwardRef<CardRef, CardProps>(({ bordered = false, ...props }, ref) => {
    return (
      <AntCard data-testid='rovna-ui-card' {...props} ref={ref} bordered={bordered} />
    );
  }),
  {
    displayName: 'Card',
    Grid,
    Meta,
  },
);

Card.displayName = 'Card';

export { Card };
