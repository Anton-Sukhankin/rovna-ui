import React from 'react';

import { HeaderProps } from '@rovna-internal/header/Header/types';
import { Support } from '@rovna-internal/header/core/Support';
import { useSupportProps } from '@rovna-internal/header/Header/hooks/useSupportProps';
import { useBurgerProps } from '@rovna-internal/header/Header/hooks/useBurgerProps';

// TODO: Есть проблема, что запрос срабатывает только 1 раз, нужно сделать на каждое открытие, как в бургере
export const SupportWithApi = (props: NonNullable<HeaderProps['support']>) => {
  const { onSend } = useSupportProps();
  const { moduleOptions } = useBurgerProps(props.moduleOptionsApi);

  return (
    <Support
      {...props}
      moduleOptions={props.moduleOptions ?? moduleOptions}
      onSend={props.onSend ?? onSend}
    />
  );
};
