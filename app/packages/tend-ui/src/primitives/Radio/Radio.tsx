import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { RadioProps, RadioRef } from './types';
import { Group } from './components';
import { Root } from './styled';

const BaseRadio = (props: RadioProps, ref: React.ForwardedRef<RadioRef>) => {
  const theme = useTheme();
  const accessibleName =
    props['aria-label'] ?? (props.children ? undefined : 'Выбрать вариант');

  return (
    <Root
      data-testid='rovna-ui-radio'
      {...props}
      aria-label={accessibleName}
      ref={ref}
      $theme={theme}
    />
  );
};

const ForwardedRadio = React.forwardRef<RadioRef, RadioProps>(BaseRadio);

const Radio = Object.assign(ForwardedRadio, {
  displayName: 'Radio',
  Group,
  Button: Root.Button,
});

export { Radio };
