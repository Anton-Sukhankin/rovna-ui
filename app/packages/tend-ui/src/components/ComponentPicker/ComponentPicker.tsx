import React from 'react';
import omit from 'lodash/omit';

import { Checkbox } from '@rovna-internal/components/primitives/Checkbox';
import { Input } from '@rovna-internal/components/primitives/Input';
import { Select } from '@rovna-internal/components/primitives/Select';
import { DatePicker } from '@rovna-internal/components/primitives/DatePicker';
import { Toggle } from '@rovna-internal/components/primitives/Toggle';
import { RangePicker } from '@rovna-internal/components/primitives/RangePicker';
import { Radio } from '@rovna-internal/components/primitives/Radio';
import { AsyncSelect } from '@rovna-internal/components/components/AsyncSelect';

import { ComponentPickerProps } from './types';

const ComponentPicker = React.memo<ComponentPickerProps>(props => {
  switch (props.component) {
    case 'input': {
      const rest = omit(props, 'component');

      return <Input {...rest} />;
    }
    case 'select': {
      const rest = omit(props, 'component');

      return <Select fullWidth {...rest} />;
    }
    case 'async-select': {
      const rest = omit(props, 'component');

      return <AsyncSelect fullWidth {...rest} />;
    }
    case 'toggle': {
      const rest = omit(props, 'component');

      return <Toggle {...rest} />;
    }
    case 'checkbox': {
      const rest = omit(props, 'component');

      return <Checkbox {...rest} />;
    }
    case 'checkbox-group': {
      const rest = omit(props, 'component');

      return <Checkbox.Group layout='vertical' {...rest} />;
    }
    case 'radio': {
      const rest = omit(props, 'component');

      return <Radio {...rest} />;
    }
    case 'radio-group': {
      const rest = omit(props, 'component');

      return <Radio.Group layout='vertical' {...rest} />;
    }
    case 'date-picker': {
      const rest = omit(props, 'component');

      return <DatePicker fullWidth {...rest} />;
    }
    case 'range-picker': {
      const rest = omit(props, 'component');

      return <RangePicker fullWidth {...rest} />;
    }
    default:
      return <span>Component is not supported</span>;
  }
});

ComponentPicker.displayName = 'ComponentPicker';

export { ComponentPicker };
