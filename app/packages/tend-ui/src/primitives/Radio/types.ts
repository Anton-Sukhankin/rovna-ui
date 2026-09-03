import React from 'react';
import AntRadio, { RadioChangeEventTarget } from 'antd-core/es/radio';
import { CheckboxOptionType } from 'antd-core/es/checkbox';
import { RadioChangeEvent } from 'antd-core/es';

import { RadioGroupProps, RadioGroupRef } from './components';

type AntRadioProps = React.ComponentPropsWithoutRef<typeof AntRadio>;
export type RadioRef = React.ElementRef<typeof AntRadio>;
export type RadioProps = AntRadioProps & React.AriaAttributes;
export type RadioOptionType = CheckboxOptionType;

export type { RadioChangeEvent, RadioChangeEventTarget, RadioGroupProps, RadioGroupRef };
