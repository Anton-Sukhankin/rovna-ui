import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import isEmpty from 'lodash/isEmpty';
import { FilterAlt } from '@rovna-ui/icons';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';
import { ToggleButton, Tooltip } from '@rovna-ui/primitives';
import { Form } from '@rovna-ui/components/components';

import { useTourContext } from '@rovna-internal/table/Table/contexts/TourContext';
import { useTableForm } from '@rovna-internal/table/Table/hooks/useTableForm';

import { FiltersButtonProps } from './types';

const FiltersButton = ({
  tooltip,
  selected,
  'aria-label': ariaLabel,
  ...props
}: FiltersButtonProps) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      '<Table.Toolbar.FiltersButton /> устарел и более не поддерживается.',
      '',
      'Используйте <Table.ControlPanel />.',
    ]);
  }
  const context = useTourContext();
  const t = useTranslation();
  const value = Form.useWatch(['filters'], useTableForm().form);
  const hasAppliedFilters = value ? Object.values(value).some(v => !isEmpty(v)) : false;
  const _selected = hasAppliedFilters || selected;

  return (
    <Tooltip title={t(['features', 'Table', 'filter'])} {...tooltip}>
      <ToggleButton
        {...props}
        aria-label={ariaLabel ?? 'Фильтры таблицы'}
        ref={context?.ui?.filtersButton}
        selected={_selected}
      >
        <FilterAlt />
      </ToggleButton>
    </Tooltip>
  );
};

FiltersButton.displayName = 'Table.Toolbar.FiltersButton';

export { FiltersButton };
