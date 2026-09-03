import React from 'react';

import { Root } from '../styled';

export const Line = () => {
  return (
    <Root className='rovna-ui-tree-line'>
      <svg
        width='20'
        height='36'
        viewBox='0 0 20 36'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M10 0L10 36' stroke='#D2D3D7' strokeDasharray='2 2' />
      </svg>
    </Root>
  );
};
