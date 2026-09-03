import React from 'react';
import AntSwitch from 'antd-core/es/switch';

type ToggleStylingSchema = {
  Text: {
    strong?: boolean;
  };
};

type AntSwitchProps = React.ComponentPropsWithoutRef<typeof AntSwitch>;
export type ToggleRef = React.ElementRef<typeof AntSwitch>;
export type ToggleProps = AntSwitchProps &
  React.AriaAttributes & {
  children?: React.ReactNode;
  /**
   * @deprecated Только для использования командой дизайн системы
   */
  UNSTABLE_styling?: ToggleStylingSchema;
  };
