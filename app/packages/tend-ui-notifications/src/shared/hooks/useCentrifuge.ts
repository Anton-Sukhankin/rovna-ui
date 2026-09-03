import { useQueryClient } from '@tanstack/react-query';
import type {
  ConnectedContext,
  ErrorContext,
  ServerPublicationContext,
} from 'centrifuge';
import { State as CentrifugeState } from 'centrifuge';
import { useEffect } from 'react';

import { queryKeys } from '@notifications/api/queryKeys';
import { useSetConnection } from '@notifications/app/store/hooks';

import { centrifugeClient } from '../api/centrifuge';

type UseCentrifugeParams = {
  onPublication?: (ctx: ServerPublicationContext) => void;
  onConnected?: (ctx: ConnectedContext) => void;
  onError?: (ctx: ErrorContext) => void;
};

export const useCentrifuge = ({
  onConnected,
  onPublication,
  onError,
}: UseCentrifugeParams) => {
  const setConnection = useSetConnection();

  const queryClient = useQueryClient();

  useEffect(() => {
    centrifugeClient.on('connected', ctx => {
      setConnection(CentrifugeState.Connected);

      try {
        onConnected?.(ctx);
      } catch (error) {
        console.error('S.Notifications: onConnected callback failed.', error);
      }
    });

    centrifugeClient.on('disconnected', () => {
      setConnection(CentrifugeState.Disconnected);
    });

    centrifugeClient.on('publication', async ctx => {
      try {
        queryClient.invalidateQueries(queryKeys.unreadCount());
        queryClient.invalidateQueries(queryKeys.list({ type: ctx.data.type }));

        onPublication?.(ctx);
      } catch (error) {
        console.error('S.Notifications: onPublication callback failed.', error);
      }
    });

    centrifugeClient.on('error', ctx => {
      try {
        onError?.(ctx);
      } catch (error) {
        console.error('S.Notifications: Unexpected behavior.', ctx);
      }
    });

    centrifugeClient.connect();

    return () => {
      centrifugeClient.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
