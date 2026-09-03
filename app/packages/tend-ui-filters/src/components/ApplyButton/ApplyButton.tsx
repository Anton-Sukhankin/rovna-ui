import React from 'react';
import { Button } from '@rovna-ui/primitives';

import { useFiltersContext } from '@rovna-internal/filters/contexts/FiltersContext';

const ApplyButton = () => {
  const ctx = useFiltersContext('Filters.ApplyButton');

  return (
    <Button data-testid='rovna-ui-filters-apply-button' onClick={ctx.apply}>
      Применить
    </Button>
  );
};

ApplyButton.displayName = 'Filters.ApplyButton';

export { ApplyButton };
