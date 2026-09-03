import React from 'react';
import { Box } from '@rovna-ui/grid';
import { useMediaQuery } from '@rovna-ui/hooks';
import { Divider } from '@rovna-ui/components/ui';
import { Button } from '@rovna-ui/primitives';
import { Profile } from '@rovna-ui/components/components';
import { Logout } from '@rovna-ui/icons/Logout';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';

import { TenantLogo } from '@rovna-internal/header/core/TenantLogo';
import { Logo } from '@rovna-internal/header/core/Logo';
import { Navigation } from '@rovna-internal/header/core/Navigation';
import { Responsive } from '@rovna-internal/header/core/Responsive';
import { Root } from '@rovna-internal/header/core/Root';
import { Project } from '@rovna-internal/header/core/Project';
import { DrawerBurgerMenu } from '@rovna-internal/header/core/DrawerBurgerMenu';
import { Stand } from '@rovna-internal/header/core/Stand';
import { StackNavigationWithApi } from '@rovna-internal/header/Header/components/StackNavigationWithApi';
import { BurgerMenuWithApi } from '@rovna-internal/header/Header/components/BurgerMenuWithApi';
import { SupportWithApi } from '@rovna-internal/header/Header/components/SupportWithApi';

import { HeaderProps } from './types';

const HEADER_HEIGHT = 52;

/**
 * Шапка для использования на внешнем рынке
 */
const Header = ({
  sticky = true,
  authenticated = true,
  stand = 'prod',
  navigation,
  logo,
  tenantLogo,
  profile,
  extra,
  support,
  authorization,
  project,
  onLogout,
  burger,
  ...props
}: React.PropsWithChildren<HeaderProps>) => {
  const t = useTranslation();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const offset = isDesktop ? 12 : 4;
  const top = navigation ? `-${HEADER_HEIGHT - offset}px` : `-${HEADER_HEIGHT}px`;

  const items = React.useMemo(() => {
    if (profile?.items) return profile.items;

    return [
      {
        key: 'profile-menu-item-logout',
        label: t(['widgets', 'Layout', 'Profile', 'logout']),
        icon: <Logout color='gray500' />,
        onClick: onLogout,
      },
    ];
  }, [onLogout, profile?.items, t]);

  return (
    <Root sticky={sticky} top={top} {...props}>
      <Box $display='flex' $alignItems='center' $gap={12} $height={32}>
        <Responsive
          mobile={
            <DrawerBurgerMenu
              title='Меню'
              header={<StackNavigationWithApi {...burger} />}
              navigation={navigation}
            />
          }
        >
          {burger && <BurgerMenuWithApi {...burger} />}
        </Responsive>
        {logo && (
          <Logo
            after={<Stand stand={stand} />}
            onClick={() => {
              window.location.replace('/');
            }}
            {...logo}
          />
        )}
        {project && (
          <Responsive>
            <Divider color='white200-transparent' variant='vertical' />
            <Project {...project} />
          </Responsive>
        )}
        <Box $display='flex' $alignItems='center' $flex='1' $gap={12}>
          {extra}
        </Box>
        {support && (
          <Responsive>
            <SupportWithApi {...support} />
          </Responsive>
        )}
        {authenticated ? (
          <Responsive>
            <Profile {...profile} items={items} />
          </Responsive>
        ) : (
          <Box $display='flex' $alignItems='center' $gap={4}>
            <Responsive>
              <Button
                as='a'
                onClick={authorization?.onSignup}
                {...authorization?.signupButtonProps}
              >
                {t(['general', 'signup'])}
              </Button>
            </Responsive>
            <Button
              as='a'
              variant='primary'
              preset='accent'
              onClick={authorization?.onSignin}
              {...authorization?.signinButtonProps}
            >
              {t(['general', 'signin'])}
            </Button>
          </Box>
        )}
        {tenantLogo && <TenantLogo {...tenantLogo} />}
      </Box>
      {navigation && (
        <Responsive>
          <Navigation {...navigation} />
        </Responsive>
      )}
    </Root>
  );
};

Header.Root = Root;
Header.Navigation = Navigation;
Header.Logo = Logo;
Header.displayName = 'Header';

export { Header };
