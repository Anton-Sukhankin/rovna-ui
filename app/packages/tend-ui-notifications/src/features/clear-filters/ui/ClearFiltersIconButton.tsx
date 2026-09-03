import { Delete } from '@rovna-ui/components/icons';
import { Button, Tooltip } from '@rovna-ui/components/primitives';
import React, { useCallback } from 'react';

import { useSetFilters } from '@notifications/app/store/hooks';
import { initialFilters } from '@notifications/shared/consts/filters';

export const ClearFiltersIconButton = () => {
  const setFilters = useSetFilters();

  const handleClearFilter = useCallback(() => {
    setFilters(initialFilters);
  }, [setFilters]);

  return (
    <Tooltip overlay='Очистить фильтры'>
      <Button
        preset='danger'
        variant='ghost'
        before={<Delete />}
        onClick={handleClearFilter}
      />
    </Tooltip>
  );
};
