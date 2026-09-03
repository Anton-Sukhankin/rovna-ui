import React from 'react';

import { OverflowProps } from './types';
import { Root } from './styled';

const Overflow = <T = unknown,>({
  className,
  items,
  render,
  overflown,
}: OverflowProps<T>) => {
  return (
    <Root<T>
      prefixCls='rovna-ui-overflow'
      className={className}
      maxCount='responsive'
      data={items}
      renderItem={render}
      renderRest={overflown}
    />
  );
};

Overflow.displayName = 'Overflow';

export { Overflow };
