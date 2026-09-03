import { Search as SearchIcon } from '@rovna-ui/components/icons';
import { Tooltip } from '@rovna-ui/components/primitives';
import React, { ReactElement, useCallback } from 'react';

import { useStore } from '@search-assistant/app/store/hooks';
import { HeaderToggleButton } from '@search-assistant/shared/ui/header-toggle-button';

type MainButtonProps = {
  renderEntry?: (setVisible: () => void) => ReactElement;
};

export const MainButton = ({ renderEntry }: MainButtonProps) => {
  const { dispatch, open } = useStore('open');

  const handleOpen = useCallback(() => {
    dispatch('general/open');
  }, [dispatch]);

  if (renderEntry) {
    return renderEntry(handleOpen);
  }

  return (
    <Tooltip overlay='Поиск'>
      <HeaderToggleButton selected={open} onSelectedChange={handleOpen}>
        <SearchIcon />
      </HeaderToggleButton>
    </Tooltip>
  );
};
