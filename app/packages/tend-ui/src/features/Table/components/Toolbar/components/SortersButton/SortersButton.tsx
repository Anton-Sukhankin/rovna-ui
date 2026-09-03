import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { DoubleArrowVertical } from '@rovna-ui/icons/DoubleArrowVertical';

import { ToggleButton } from '@rovna-internal/components/primitives/ToggleButton';
import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';
import { useTourContext } from '@rovna-internal/components/features/Table/contexts/TourContext';

import { SortersButtonProps } from './types';

const SortersButton = ({ tooltip, ...props }: SortersButtonProps) => {
  const context = useTourContext();
  const t = useTranslation();

  return (
    <Tooltip title={t(['features', 'Table', 'sorter'])} {...tooltip}>
      <ToggleButton {...props} ref={context?.ui?.sortersButton}>
        <DoubleArrowVertical size={20} />
      </ToggleButton>
    </Tooltip>
  );
};

SortersButton.displayName = 'Table.Toolbar.SortersButton';

export { SortersButton };
