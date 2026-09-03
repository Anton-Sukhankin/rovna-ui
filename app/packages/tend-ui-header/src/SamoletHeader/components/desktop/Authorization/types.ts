import React from 'react';
import { ButtonProps } from '@rovna-ui/components/primitives';

export type AuthorizationProps = {
  signinButtonProps?: ButtonProps<'a'>;
  signupButtonProps?: ButtonProps<'a'>;
  onSignin?: (event: React.MouseEvent) => void;
  onSignup?: (event: React.MouseEvent) => void;
};
