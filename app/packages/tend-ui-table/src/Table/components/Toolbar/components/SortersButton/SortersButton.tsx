import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { DoubleArrowVertical } from '@rovna-ui/icons';
import { ToggleButton, Tooltip } from '@rovna-ui/primitives';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';

import { useTourContext } from '@rovna-internal/table/Table/contexts/TourContext';

import { SortersButtonProps } from './types';

const SortersButton = ({ tooltip, 'aria-label': ariaLabel, ...props }: SortersButtonProps) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      '<Table.Toolbar.SortersButton /> устарел и более не поддерживается.',
      '',
      'Используйте <Table.ControlPanel />.',
    ]);
  }

  const context = useTourContext();
  const t = useTranslation();

  return (
    <Tooltip title={t(['features', 'Table', 'sorter'])} {...tooltip}>
      <ToggleButton
        {...props}
        aria-label={ariaLabel ?? 'Сортировка таблицы'}
        ref={context?.ui?.sortersButton}
      >
        <DoubleArrowVertical size={20} />
      </ToggleButton>
    </Tooltip>
  );
};

SortersButton.displayName = 'Table.Toolbar.SortersButton';

export { SortersButton };
