import React from 'react';

import { useModulesSettingsQuery } from '@notifications/api/hooks';
import { ScreenLoader } from '@notifications/shared/ui/screen-loader';
import { ServicesItem } from '@notifications/widgets/services-item';

import { useServiceItemHandlers } from '../hooks/useServiceItemHandlers';
import * as Styled from './ServicesList.styled';

export const ServicesList = () => {
  const { settings, settingsLoading } = useModulesSettingsQuery();
  const { onClickItemHandler, onChangeNotificationToggle } =
    useServiceItemHandlers(settings);

  return (
    <Styled.Container>
      {settingsLoading && <ScreenLoader />}
      {settings?.map(({ id, name, is_enabled, is_personal }) => (
        <ServicesItem
          key={id}
          label={name}
          isEnabled={is_enabled}
          isPersonal={is_personal}
          onClickItem={() => onClickItemHandler(id)}
          onChangeNotificationToggle={val => onChangeNotificationToggle(id, val)}
        />
      ))}
    </Styled.Container>
  );
};
