import React, { FC, useCallback } from 'react';
import { Badge, Tooltip } from '@rovna-ui/components/primitives';
import { Notification as NotificationIcon } from '@rovna-ui/components/icons';
import type {
  ConnectedContext,
  ErrorContext,
  ServerPublicationContext,
} from 'centrifuge';

import { useCentrifuge } from '@notifications/shared/hooks/useCentrifuge';
import { useScreen } from '@notifications/app/store/hooks';
import { useUnreadCountQuery } from '@notifications/api/hooks';
import { HeaderToggleButton } from '@notifications/shared/ui/header-toggle-button';
import { DrawerComponent } from '@notifications/widgets/drawer';

export type NotificationAppProps = {
  onPublication?: (ctx: ServerPublicationContext) => void;
  onConnected?: (ctx: ConnectedContext) => void;
  onError?: (ctx: ErrorContext) => void;
};

export const App: FC<NotificationAppProps> = props => {
  useCentrifuge(props);

  const { screen, setScreen } = useScreen();
  const { counters } = useUnreadCountQuery();

  const handleOpen = useCallback(() => setScreen('list'), [setScreen]);

  return (
    <>
      <Tooltip overlay='Уведомления'>
        <HeaderToggleButton selected={!!screen} onSelectedChange={handleOpen}>
          <Badge
            preset='default'
            offset={[-1, 0]}
            hidden={!counters?.IMPORTANT}
            // TODO: remove after UI fixed
            style={{ border: '1px solid #1988FB', boxSizing: 'border-box' }}
          >
            <NotificationIcon />
          </Badge>
        </HeaderToggleButton>
      </Tooltip>
      <DrawerComponent />
    </>
  );
};
