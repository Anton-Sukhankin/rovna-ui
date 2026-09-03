import React from 'react';
import { ApiOptions } from '@rovna-ui/api';
import { StackNavigation, StackNavigationProps } from '@rovna-ui/primitives';

import { useBurgerProps } from '@rovna-internal/header/Header/hooks/useBurgerProps';
import { GlobalServiceResponse } from '@rovna-internal/header/Header/hooks';

// TODO: Есть проблема, что запрос срабатывает только 1 раз, нужно сделать на каждое открытие, как в бургере
export const StackNavigationWithApi = (
  props:
    | ({
        api: ApiOptions<GlobalServiceResponse[]>;
        // При API - все остальные пропсы опциональны
      } & Partial<StackNavigationProps>)
    | ({
        api?: undefined;
        // Без API - нужны все обязательные пропсы
      } & StackNavigationProps),
) => {
  const apiProps = useBurgerProps(props.api);

  return <StackNavigation {...apiProps} {...props} />;
};
