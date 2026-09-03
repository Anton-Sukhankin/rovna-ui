import React from 'react';

import { SettingsDisabledAlert } from '@notifications/widgets/settings-disabled';
import { SettingsTypeEntries } from '@notifications/widgets/settings-type-entries';
import { SettingsTypeSender } from '@notifications/widgets/settings-type-sender';
import { useSaveSettingsState } from '@notifications/app/store/hooks';
import { SettingsActions } from '@notifications/widgets/settings-actions';
import { useHeaderShadow } from '@notifications/shared/hooks/useHeaderShadow';

import * as Styled from './ServiceSettings.styled';

export const ServiceSettings = () => {
  const { scrollableRef } = useHeaderShadow();
  const { isSavedSettings } = useSaveSettingsState();

  return (
    <Styled.Container ref={scrollableRef}>
      <SettingsDisabledAlert />
      <SettingsTypeSender />
      <SettingsTypeEntries />
      {!isSavedSettings && <SettingsActions />}
    </Styled.Container>
  );
};
