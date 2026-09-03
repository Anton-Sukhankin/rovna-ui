import { FiltersProps as _FilterProps } from '@rovna-ui/filters';
import { GenericObject } from '@rovna-ui/types';

export type FiltersProps<T extends GenericObject = GenericObject> = Pick<
  _FilterProps<T>,
  | 'open'
  | 'onClose'
  | 'loading'
  | 'title'
  | 'showPresets'
  | 'presets'
  | 'defaultPresets'
  | 'localStorage'
  | 'showApplyButton'
  | 'onPresetSave'
  | 'onPresetEdit'
  | 'onPresetRemove'
  | 'onPresetsChange'
>;
