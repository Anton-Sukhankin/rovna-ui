import React from 'react';

import { Root } from '../styled';

export const Branch = () => {
  return (
    <Root className='rovna-ui-tree-branch'>
      <svg
        width='22'
        height='36'
        viewBox='0 0 22 36'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M10 0L10 36' stroke='#D2D3D7' strokeDasharray='2 2' />
        <path d='M10 18H22' stroke='#D2D3D7' strokeDasharray='2 2' />
      </svg>
    </Root>
  );
};
