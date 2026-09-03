import { Button } from '@rovna-ui/components/primitives';
import React, { useCallback } from 'react';

import { useSetFilters } from '@notifications/app/store/hooks';
import { initialFilters } from '@notifications/shared/consts/filters';

export const ClearFiltersButton = () => {
  const setFilters = useSetFilters();

  const handleReset = useCallback(() => {
    setFilters(initialFilters);
  }, [setFilters]);

  return (
    <Button size='small' variant='link' onClick={handleReset}>
      Сбросить все фильтры
    </Button>
  );
};
