import { createContext } from '@rovna-ui/factories';

import { FilterPreset } from '../core/types';

type Context = {
  presets: FilterPreset[];
  onSave: (preset: FilterPreset) => void;
  onEdit: (preset: FilterPreset) => void;
  onRemove: (preset: FilterPreset) => void;
  onApply: (preset: FilterPreset) => void;
};

export const [FiltersPresetsProvider, useFiltersPresetsProvider] =
  createContext<Context>('FPP');
