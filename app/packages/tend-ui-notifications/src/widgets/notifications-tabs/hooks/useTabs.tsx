import { Badge } from '@rovna-ui/components/primitives';
import React, { useCallback, useMemo } from 'react';
import { Box } from '@rovna-ui/components/grid';

import { useUnreadCountQuery } from '@notifications/api/hooks';
import type { NotificationType } from '@notifications/api/types';
import {
  useNotificationsSetType,
  useNotificationsType,
} from '@notifications/app/store/hooks';

import { tabItems } from '../lib/consts';

export const useTabs = () => {
  const currentType = useNotificationsType();
  const setCurrentType = useNotificationsSetType();

  const { counters } = useUnreadCountQuery();

  const items = useMemo(
    () =>
      tabItems.map(item => ({
        ...item,
        label: (
          <Box $display='flex' $gap={8} $alignItems='center'>
            {item.label}
            {(counters?.[item.key as NotificationType] || 0) > 0 && (
              <Badge
                inner={counters?.[item.key as NotificationType]}
                preset='blue'
                showZero={false}
              />
            )}
          </Box>
        ),
      })),
    [counters],
  );

  const onChange = useCallback(
    (key: string) => {
      const type = key as NotificationType;
      setCurrentType(type);
    },
    [setCurrentType],
  );

  return {
    items,
    activeKey: currentType,
    onChange,
  };
};
