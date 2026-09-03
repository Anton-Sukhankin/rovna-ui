import React from 'react';
import { contextFactory } from '@rovna-ui/factories';
import { Colors } from '@rovna-ui/tokens';

import { SamoletTheme } from './SamoletTheme';
import { GlobalTheme } from './GlobalTheme';
import { ThemeSchema } from './types';

const [ThemeContext, useTheme] = contextFactory<ThemeSchema>(
  'ThemeContext',
  SamoletTheme,
);

const useColors = () => {
  return useTheme().colors;
};

const useColor = <T extends string>(color?: T, defaultColor?: T) => {
  const colors = useColors();
  const presets = Object.keys(colors);
  if (!color) return defaultColor;
  const k = color as keyof Colors;

  return presets.includes(color) ? colors[k] : color;
};

const themes = {
  samolet: SamoletTheme,
  global: GlobalTheme,
};

const Theme = ({
  children,
  theme,
}: React.PropsWithChildren<{ theme: 'samolet' | 'global' }>) => {
  return <ThemeContext value={themes[theme]}>{children}</ThemeContext>;
};

export { useTheme, useColors, useColor, Theme };
