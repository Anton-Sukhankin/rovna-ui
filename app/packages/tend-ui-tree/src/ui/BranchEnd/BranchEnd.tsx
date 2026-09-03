import React from 'react';

import { Root } from '../styled';

export const BranchEnd = () => {
  return (
    <Root className='rovna-ui-tree-branch-end'>
      <svg
        width='22'
        height='30'
        viewBox='0 0 22 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M10 0L10 20' stroke='#D2D3D7' strokeDasharray='2 2' />
        <path d='M10 20H22' stroke='#D2D3D7' strokeDasharray='2 2' />
      </svg>
    </Root>
  );
};
