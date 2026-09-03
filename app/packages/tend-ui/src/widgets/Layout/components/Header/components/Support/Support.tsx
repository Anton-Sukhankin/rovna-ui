import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { HeadphoneSupport } from '@rovna-ui/icons/HeadphoneSupport';

import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';
import { ToggleButton } from '@rovna-internal/components/primitives/ToggleButton';

import { SupportProps } from './types';

const Support = ({ component: Component, href }: SupportProps) => {
  const t = useTranslation();
  const button = (
    <ToggleButton selectable={false} aria-disabled={!Component && !href}>
      <HeadphoneSupport color='gray900' size={20} />
    </ToggleButton>
  );

  return (
    <Tooltip title={t(['widgets', 'Layout', 'Header', 'support'])}>
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

Support.displayName = 'Layout.Header.Support';

export { Support };
