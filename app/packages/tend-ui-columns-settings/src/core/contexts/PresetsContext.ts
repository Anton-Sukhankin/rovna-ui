import { createContext } from '@rovna-ui/factories';

import { ColumnsSettingsPreset } from '../interfaces/ColumnsSettingsPreset';
import { ColumnsSettings } from '../interfaces';

type Context = {
  settings: ColumnsSettings;
  presets: ColumnsSettingsPreset[];
};

export const [ColumnsSettingsPresetsProvider, useColumnsSettingsPresetsProvider] =
  createContext<Context>('ColumnsSettingsPresetsProvider');
