import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Close } from '@rovna-ui/icons/Close';

import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';
import { TooltipProps } from '@rovna-internal/components/primitives/Tooltip/types';

type AllowClear = { allowClear?: boolean; clearIconTooltip?: TooltipProps };
/**
 * @deprecated Используйте `useAllowClear` из `@rovna-ui/primitives`
 */
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
          <span aria-label='Очистить поле' role='img'>
            <Close aria-hidden size={16} />
          </span>
        </Tooltip>
      ),
    };
  }, [allowClear, clearIconTooltip, t]);
};
