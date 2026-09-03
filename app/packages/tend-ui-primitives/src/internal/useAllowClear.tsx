import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Close } from '@rovna-ui/icons/Close';

import { Tooltip } from '../Tooltip';
import { TooltipProps } from '../Tooltip/types';

type AllowClear = { allowClear?: boolean; clearIconTooltip?: TooltipProps };

export const useAllowClear = <T extends AllowClear>({
  allowClear,
  clearIconTooltip,
}: T) => {
  const t = useTranslation();

  return React.useMemo(() => {
    if (typeof allowClear === 'undefined') return;
    if (allowClear === false) return allowClear;

    return {
      clearIcon: (
        <Tooltip title={t(['general', 'clear'])} {...clearIconTooltip}>
          <Close size={16} aria-label={t(['general', 'clear'])} />
        </Tooltip>
      ),
    };
  }, [allowClear, clearIconTooltip, t]);
};
