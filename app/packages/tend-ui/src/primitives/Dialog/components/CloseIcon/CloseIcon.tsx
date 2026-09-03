import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Close } from '@rovna-ui/icons/Close';

import { Tooltip, TooltipProps } from '@rovna-internal/components/primitives/Tooltip';

export const CloseIcon = (props: Omit<TooltipProps, 'children'>) => {
  const t = useTranslation();
  const isEmpty = Object.entries(props).length === 0;

  const tooltipProps = React.useMemo<TooltipProps>(() => {
    if (isEmpty) return { title: t(['general', 'close']) };

    return props;
  }, [isEmpty, props, t]);

  return (
    <Tooltip {...tooltipProps}>
      <Close size={20} />
    </Tooltip>
  );
};
