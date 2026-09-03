import React from 'react';
import AntRadioGroup from 'antd-core/es/radio';

type AntRadioGroupProps = React.ComponentPropsWithoutRef<typeof AntRadioGroup.Group>;
export type RadioGroupRef = React.ElementRef<typeof AntRadioGroup.Group>;
export type RadioGroupProps = AntRadioGroupProps &
  React.AriaAttributes & {
  /**
   * Позволяет растянуть компонент на всею ширину
   */
  fullWidth?: boolean;
  /**
   * Вариант отображения (вертикальный/горизонтальный)
   */
  layout?: 'horizontal' | 'vertical';
  };
