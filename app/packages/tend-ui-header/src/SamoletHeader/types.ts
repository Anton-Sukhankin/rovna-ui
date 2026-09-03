import React from 'react';
import { LiteralUnion, SamoletProfile, SamoletService, Stand } from '@rovna-ui/types';
import { MarginProperties } from '@rovna-ui/styling';

import { NavigationProps, ProjectProps } from '@rovna-internal/header/core';

import { AuthorizationProps, LogoProps, ProfileProps } from './components';

type Slots = {
  search?: React.ReactNode;
  notifications?: React.ReactNode;
};

export type SamoletHeaderProps = MarginProperties & {
  /**
   * Имя сервиса (`s.pro`, `s.pass`, `s.control`)
   */
  app: LiteralUnion<SamoletService>;
  /**
   * Позволяет отключать поведение "липкости"
   */
  sticky?: boolean;
  /**
   * Позволяет скрывать/отображать кнопки "Войти" и "Регистрация"
   */
  authenticated?: boolean;
  /**
   * Окружение. От этого свойства зависят куда ведут ссылки
   */
  stand?: Stand;
  /**
   * Свойства компонента `Navigation`
   */
  navigation?: NavigationProps;
  /**
   * Свойства компонента `Logo`
   */
  logo?: Pick<LogoProps, 'onClick' | 'children' | 'before'>;
  /**
   * Профиль пользователя
   */
  user?: SamoletProfile;
  /**
   * Свойства компонента `Profile`
   */
  profile?: Pick<ProfileProps, 'items'>;
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
  slots?: Slots;
  /**
   * Вызывается при нажатии кнопки "Выйти"
   */
  onLogout?: () => void;
};
