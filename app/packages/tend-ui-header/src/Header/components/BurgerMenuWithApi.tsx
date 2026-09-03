import React from 'react';

import { HeaderProps } from '@rovna-internal/header/Header/types';
import { BurgerMenu as DesktopBurgerMenu } from '@rovna-internal/header/core/BurgerMenu';
import { useBurgerProps } from '@rovna-internal/header/Header/hooks/useBurgerProps';

export const BurgerMenuWithApi = (props: NonNullable<HeaderProps['burger']>) => {
  const apiProps = useBurgerProps(props.api);

  return <DesktopBurgerMenu {...apiProps} error={Boolean(apiProps.error)} {...props} />;
};
