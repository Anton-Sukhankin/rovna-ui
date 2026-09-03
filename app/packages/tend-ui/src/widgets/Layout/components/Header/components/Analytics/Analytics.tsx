import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { BarChart } from '@rovna-ui/icons/BarChart';

import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';
import { ToggleButton } from '@rovna-internal/components/primitives/ToggleButton';

import { AnalyticsProps } from './types';

const Analytics = ({ component: Component, href }: AnalyticsProps) => {
  const t = useTranslation();
  const button = (
    <ToggleButton selectable={false} aria-disabled={!Component && !href}>
      <BarChart color='gray900' size={20} />
    </ToggleButton>
  );

  return (
    <Tooltip title={t(['widgets', 'Layout', 'Header', 'analytics'])}>
      {Component ? (
        <Component>{button}</Component>
      ) : href ? (
        <a href={href} target='_blank' rel='noreferrer'>
          {button}
        </a>
      ) : (
        button
      )}
    </Tooltip>
  );
};

Analytics.displayName = 'Layout.Header.Analytics';

export { Analytics };
