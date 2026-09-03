import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Book } from '@rovna-ui/icons/Book';

import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';
import { ToggleButton } from '@rovna-internal/components/primitives/ToggleButton';

import { InfoProps } from './types';

const Info = ({ component: Component, href }: InfoProps) => {
  const t = useTranslation();
  const button = (
    <ToggleButton selectable={false} aria-disabled={!Component && !href}>
      <Book color='gray900' size={20} />
    </ToggleButton>
  );

  return (
    <Tooltip title={t(['widgets', 'Layout', 'Header', 'info'])}>
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

Info.displayName = 'Layout.Header.Info';

export { Info };
