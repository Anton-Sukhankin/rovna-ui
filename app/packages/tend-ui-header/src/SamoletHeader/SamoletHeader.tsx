import React from 'react';
import { Box } from '@rovna-ui/grid';
import { useMediaQuery } from '@rovna-ui/hooks';
import { Divider } from '@rovna-ui/components/ui';

import { Navigation } from '@rovna-internal/header/core/Navigation';
import { Responsive } from '@rovna-internal/header/core/Responsive';
import { Logo as CoreLogo } from '@rovna-internal/header/core/Logo';
import { Root } from '@rovna-internal/header/core/Root';
import { useRole } from '@rovna-internal/header/SamoletHeader/hooks/useRole';
import { Project } from '@rovna-internal/header/core/Project';

import { Analytics } from './components/desktop/Analytics';
import { Authorization } from './components/desktop/Authorization';
import { Logo } from './components/desktop/Logo';
import { Profile } from './components/desktop/Profile';
import { Support } from './components/desktop/Support';
import { BurgerMenu as DesktopBurgerMenu } from './components/desktop/BurgerMenu';
import { MobileBurgerMenu } from './components/mobile/MobileBurgerMenu';
import { SamoletHeaderProps as HeaderProps } from './types';

const HEADER_HEIGHT = 52;

/**
 * Шапка для продуктов Samolet
 */
const SamoletHeader = ({
  sticky = true,
  authenticated = true,
  stand = 'prod',
  app,
  navigation,
  user,
  logo,
  profile,
  slots,
  authorization,
  project,
  onLogout = () => {
    window.location.replace('/accounts/logout/');
  },
  ...props
}: React.PropsWithChildren<HeaderProps>) => {
  const { isEmployee } = useRole(user);
  const search = slots?.search;
  const notifications = slots?.notifications;
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const offset = isDesktop ? 12 : 4;
  const top = navigation ? `-${HEADER_HEIGHT - offset}px` : `-${HEADER_HEIGHT}px`;

  return (
    <Root sticky={sticky} top={top} {...props}>
      <Box $display='flex' $alignItems='center' $gap={12} $height={32}>
        <Responsive
          mobile={
            <MobileBurgerMenu
              user={user}
              profile={profile}
              stand={stand}
              navigation={navigation}
              authenticated={authenticated}
              onLogout={onLogout}
            />
          }
        >
          {authenticated && <DesktopBurgerMenu app={app} stand={stand} />}
        </Responsive>
        <Logo
          app={app}
          stand={stand}
          onClick={() => {
            window.location.replace('/');
          }}
          {...logo}
        />
        {project && (
          <Responsive>
            <Divider color='white200-transparent' variant='vertical' />
            <Project {...project} />
          </Responsive>
        )}
        <Box
          $display='flex'
          $alignItems='center'
          $justifyContent='flex-end'
          $flex='1'
          $gap={12}
        >
          {authenticated && isEmployee && (
            <Responsive>
              <Analytics stand={stand} />
            </Responsive>
          )}
          {authenticated && (
            <Responsive>
              <Support stand={stand} />
            </Responsive>
          )}
          {search}
          {notifications}
        </Box>
        {authenticated ? (
          <Responsive>
            <Profile user={user} items={profile?.items} onLogout={onLogout} />
          </Responsive>
        ) : (
          <Authorization {...authorization} />
        )}
      </Box>
      {navigation && (
        <Responsive>
          <Navigation {...navigation} />
        </Responsive>
      )}
    </Root>
  );
};

SamoletHeader.Root = Root;
SamoletHeader.Navigation = Navigation;
SamoletHeader.Logo = CoreLogo;
SamoletHeader.displayName = 'SamoletHeader';

export { SamoletHeader };
