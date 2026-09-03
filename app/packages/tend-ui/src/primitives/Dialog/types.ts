import React from 'react';
import { ModalFuncProps } from 'antd-core/es/modal';
import { ModalFunc } from 'antd-core/es/modal/confirm';

import { ButtonProps } from '@rovna-internal/components/primitives/Button';
import { TooltipProps } from '@rovna-internal/components/primitives/Tooltip';

export type DialogMethods = {
  info: ModalFunc;
  success: ModalFunc;
  warning: ModalFunc;
  error: ModalFunc;
  confirm: ModalFunc;
};

export type DialogMethodProps = Omit<
  ModalFuncProps,
  'footer' | 'okButtonProps' | 'cancelButtonProps' | 'closeIcon' | 'okType'
> & {
  okType?: ButtonProps['variant'];
  okButtonProps?: Omit<ButtonProps<'button'>, 'ref'>;
  cancelButtonProps?: Omit<ButtonProps<'button'>, 'ref'>;
  closeIconTooltip?: Omit<TooltipProps, 'children'>;
  footer?: React.ReactNode | React.ReactNode[];
};
export type DialogMethodConfirmProps = DialogMethodProps & {
  /**
   * @deprecated Устарело и будет удалено в следующем мажорном обновлении
   * Компонент больше не поддерживает вставку картинок
   */
  image?: {
    src?: string;
    layout?: 'cover' | 'contain';
  };
};
