import { ColumnsSettingsPreset } from './ColumnsSettingsPreset';

export interface Preset {
  readonly id: string;
  readonly original: ColumnsSettingsPreset;
  readonly apply: (preset: ColumnsSettingsPreset) => void;
  readonly edit: (preset: ColumnsSettingsPreset) => void;
  readonly remove: (preset: ColumnsSettingsPreset) => void;
}
