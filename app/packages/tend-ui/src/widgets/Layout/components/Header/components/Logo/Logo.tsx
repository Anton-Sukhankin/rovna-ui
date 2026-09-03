import React from 'react';

import { Logo as DefaultLogo } from '@rovna-internal/components/components/Logo';

import { LogoProps } from './types';

const Logo = (props: LogoProps) => {
  return <DefaultLogo {...props} />;
};

Logo.displayName = 'Layout.Header.Logo';

export { Logo };
