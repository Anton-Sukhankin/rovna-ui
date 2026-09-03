import React from 'react';
import { ApiOptions } from '@rovna-ui/api';
import { Stand } from '@rovna-ui/types';
import { MarginProperties } from '@rovna-ui/styling';
import { ProfileProps } from '@rovna-ui/components/components';

import {
  BurgerMenuProps,
  LogoProps,
  NavigationProps,
  ProjectProps,
  SupportProps,
  TenantLogoProps,
} from '@rovna-internal/header/core';
import { AuthorizationProps } from '@rovna-internal/header/SamoletHeader/components';
import { GlobalServiceResponse } from '@rovna-internal/header/Header/hooks';

export type HeaderProps = MarginProperties & {
  /**
   * Позволяет отключать поведение "липкости"
   */
  sticky?: boolean;
  /**
   * Позволяет скрывать/отображать кнопки "Войти" и "Регистрация"
   */
  authenticated?: boolean;
  /**
   * Окружение
   */
  stand?: Stand;
  /**
   * Бургер меню
   */
  burger?:
    | ({
        api: ApiOptions<GlobalServiceResponse[]>;
        // При API - все остальные пропсы опциональны
      } & Partial<BurgerMenuProps>)
    | ({
        api?: undefined;
        // Без API - нужны все обязательные пропсы
      } & BurgerMenuProps);
  /**
   * Свойства компонента `Navigation`
   */
  navigation?: NavigationProps;
  /**
   * Свойства компонента `Logo`
   */
  logo?: Pick<LogoProps, 'onClick' | 'children' | 'before'>;
  /**
   * Свойства компонента `TenantLogo`
   */
  tenantLogo?: TenantLogoProps;
  /**
   * Свойства компонента `Support`
   */
  support?:
    | ({
        moduleOptionsApi: ApiOptions<GlobalServiceResponse[]>;
        // При API - все остальные пропсы опциональны
      } & Partial<SupportProps>)
    | ({
        moduleOptionsApi?: undefined;
        // Без API - нужны все обязательные пропсы
      } & SupportProps);
  /**
   * Свойства компонента `Profile`
   */
  profile?: ProfileProps;
  /**
   * Свойства компонента `Authorization`
   */
  authorization?: AuthorizationProps;
  /**
   * Свойства компонента `Project`
   */
  project?: ProjectProps;
  /**
   * Кастомизируемые слоты
   */
  extra?: React.ReactNode;
  /**
   * Вызывается при нажатии кнопки "Выйти"
   */
  onLogout?: () => void;
};
