import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Box } from '@rovna-ui/grid';
import { Button } from '@rovna-ui/primitives';

import { Responsive } from '@rovna-internal/header/core/Responsive';

import { AuthorizationProps } from './types';

const Authorization = ({
  signinButtonProps,
  signupButtonProps,
  onSignin,
  onSignup,
}: AuthorizationProps) => {
  const t = useTranslation();

  return (
    <Box $display='flex' $alignItems='center' $gap={4}>
      <Responsive>
        <Button
          as='a'
          href='/accounts/register/'
          onClick={onSignup}
          {...signupButtonProps}
        >
          {t(['general', 'signup'])}
        </Button>
      </Responsive>
      <Button
        as='a'
        href='/accounts/login/'
        variant='primary'
        preset='accent'
        onClick={onSignin}
        {...signinButtonProps}
      >
        {t(['general', 'signin'])}
      </Button>
    </Box>
  );
};

export { Authorization };
