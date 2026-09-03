import { Drawer } from '@rovna-ui/primitives';
import React, { useCallback, useMemo } from 'react';

import { useScreen } from '@notifications/app/store/hooks';
import { Filters } from '@notifications/screens/filters';
import { Notifications } from '@notifications/screens/notifications';
import { ServiceSettings } from '@notifications/screens/service-settings';
import { Services } from '@notifications/screens/services';

import * as Styled from './Drawer.styled';
import { DrawerTitle } from './Title';

export const DrawerComponent = () => {
  const { screen, setScreen } = useScreen();

  const isList = useMemo(() => screen === 'list', [screen]);

  const handleClose = useCallback(() => {
    setScreen(null);
  }, [setScreen]);

  return (
    <Drawer.Root
      open={!!screen}
      onClose={handleClose}
      // maskClosable={isList}
    >
      <Styled.Header className='rovna-ui-notifications-header'>
        <DrawerTitle />
        {isList && <Drawer.CloseButton />}
      </Styled.Header>
      <Styled.Body>
        {screen === 'list' && <Notifications />}
        {screen === 'filters' && <Filters />}
        {screen === 'services' && <Services />}
        {screen === 'service-settings' && <ServiceSettings />}
      </Styled.Body>
    </Drawer.Root>
  );
};
