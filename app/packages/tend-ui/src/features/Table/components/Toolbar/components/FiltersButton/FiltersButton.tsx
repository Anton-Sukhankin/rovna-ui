import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import isEmpty from 'lodash/isEmpty';
import { FilterAlt } from '@rovna-ui/icons/FilterAlt';

import { ToggleButton } from '@rovna-internal/components/primitives/ToggleButton';
import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';
import { useTourContext } from '@rovna-internal/components/features/Table/contexts/TourContext';
import { useTableForm } from '@rovna-internal/components/features/Table/hooks/useTableForm';
import { Form } from '@rovna-internal/components/components/Form';

import { FiltersButtonProps } from './types';

const FiltersButton = ({ tooltip, selected, ...props }: FiltersButtonProps) => {
  const context = useTourContext();
  const t = useTranslation();
  const value = Form.useWatch(['filters'], useTableForm().form);
  const hasAppliedFilters = value ? Object.values(value).some(v => !isEmpty(v)) : false;
  const _selected = hasAppliedFilters || selected;

  return (
    <Tooltip title={t(['features', 'Table', 'filter'])} {...tooltip}>
      <ToggleButton {...props} ref={context?.ui?.filtersButton} selected={_selected}>
        <FilterAlt />
      </ToggleButton>
    </Tooltip>
  );
};

FiltersButton.displayName = 'Table.Toolbar.FiltersButton';

export { FiltersButton };
