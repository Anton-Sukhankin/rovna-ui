import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';

import { Box } from '@rovna-internal/components/grid/Box';
import { Button } from '@rovna-internal/components/primitives/Button';

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
      <Button
        as='a'
        href='/accounts/login/'
        variant='secondary'
        onClick={onSignin}
        {...signinButtonProps}
      >
        {t(['general', 'signin'])}
      </Button>
      <Button as='a' href='/accounts/logout/' onClick={onSignup} {...signupButtonProps}>
        {t(['general', 'signup'])}
      </Button>
    </Box>
  );
};

Authorization.displayName = 'Layout.Header.Authorization';

export { Authorization };
