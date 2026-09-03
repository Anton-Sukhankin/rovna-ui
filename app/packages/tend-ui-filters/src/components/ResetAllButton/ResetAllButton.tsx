import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Button } from '@rovna-ui/components/primitives';

import { useFiltersFormProvider } from '@rovna-internal/filters/core/FiltersFormProvider';

import { ResetAllButtonProps } from './types';

const ResetAllButton = (props: ResetAllButtonProps) => {
  const t = useTranslation();
  const model = useFiltersFormProvider('Filters.ResetButton');

  return (
    <Button
      data-testid='rovna-ui-filters-reset-all-button'
      size='small'
      variant='link'
      onClick={model.onReset}
      {...props}
    >
      {t(['components', 'Filters', 'reset'])}
    </Button>
  );
};

ResetAllButton.displayName = 'Filters.ResetAllButton';

export { ResetAllButton };
