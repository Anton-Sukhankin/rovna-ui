import { DropdownItem } from '@rovna-ui/components/primitives';
import {
  DividerOption,
  LabeledOption,
  isDividerOption,
  isLabeledOption,
} from '@rovna-ui/types';

import { ProjectOption } from './types';

export const mapProjectOptionToDropdownItem = (options: ProjectOption[]) => {
  return options.map<DropdownItem>(option => {
    if (isDividerOption(option)) return { type: 'divider' };
    if (isLabeledOption(option))
      return { key: option.value.toString(), label: option.label, selectable: true };

    return { key: option.toString(), label: option, selectable: true };
  });
};

export const mapProjectOptionToLabeledOption = (options: ProjectOption[]) => {
  return options.map<LabeledOption | DividerOption>(option => {
    if (isDividerOption(option) || isLabeledOption(option)) return option;

    return { value: option, label: option };
  });
};
