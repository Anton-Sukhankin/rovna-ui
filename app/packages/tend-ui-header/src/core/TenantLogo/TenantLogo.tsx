import React from 'react';
import { useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import {
  FskLogo,
  InacrticaLogo,
  ParitetLogo,
  RascvetayLogo,
  StranaLogo,
  StroyCenterLogo,
  TavridaLogo,
  TochnoLogo,
} from './logos';
import { TenantLogoProps } from './types';
import { LogoWrapper, Root } from './styled';

const getLogoByName = (
  tenantName: TenantLogoProps['logoName'],
): { logo: React.ReactNode; bgColor: string } | null => {
  switch (tenantName) {
    case 'rascvetay':
      return { logo: <RascvetayLogo />, bgColor: 'white' };
    case 'stroyСenter':
      return { logo: <StroyCenterLogo />, bgColor: 'white' };
    case 'fsk':
      return { logo: <FskLogo />, bgColor: 'black' };
    case 'tochno':
      return { logo: <TochnoLogo />, bgColor: 'white' };
    case 'strana':
      return { logo: <StranaLogo />, bgColor: 'white' };
    case 'paritet':
      return { logo: <ParitetLogo />, bgColor: 'white' };
    case 'tavrida':
      return { logo: <TavridaLogo />, bgColor: 'white' };
    case 'inarctica':
      return { logo: <InacrticaLogo />, bgColor: 'white' };
    default:
      return null;
  }
};

const TenantLogo = ({ logoName, onClick }: TenantLogoProps) => {
  const theme = useTheme();

  const data = getLogoByName(logoName);

  if (!data) {
    return null;
  }

  return (
    <Root
      theme={theme}
      className={cn(['rovna-ui-tenant-logo-root'])}
      $pointer={!!onClick}
      onClick={onClick}
      $backgroundColor={data.bgColor}
    >
      <LogoWrapper>{data.logo}</LogoWrapper>
    </Root>
  );
};

export { TenantLogo };
