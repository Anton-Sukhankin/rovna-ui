import React from 'react';

import { Text } from '@rovna-internal/components/typography/Text';
import { Box } from '@rovna-internal/components/grid/Box';

import { LogoProps } from './types';

const Logo = ({ before, after, children, className, onClick }: LogoProps) => {
  return (
    <Box
      $display='flex'
      $alignItems='center'
      $gap={8}
      $padding='6px 4px'
      $pointer={!!onClick}
      className={['rovna-ui-logo', className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {before}
      <Text style={{ display: 'block', whiteSpace: 'nowrap' }} strong>
        {children}
      </Text>
      {after}
    </Box>
  );
};

Logo.displayName = 'Logo';

export { Logo };
