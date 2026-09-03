import { createContext } from '@rovna-ui/factories';

import { ColumnsSettingsPreset } from '../core/interfaces/ColumnsSettingsPreset';

type Context = {
  presets: ColumnsSettingsPreset[];
  onPresetSave?: (preset: ColumnsSettingsPreset) => void;
  onPresetEdit?: (preset: ColumnsSettingsPreset) => void;
  onPresetRemove?: (preset: ColumnsSettingsPreset) => void;
  onPresetApply?: (preset: ColumnsSettingsPreset) => void;
};

export const [ColumnsSettingsPresetsProvider, useColumnsSettingsPresetsProvider] =
  createContext<Context>('ColumnsSettingsPresetsProvider');
