import React from 'react';
import AntInput from 'antd-core/es/input/Search';
import { DimensionProperties, MarginProperties } from '@rovna-ui/styling';

import { BaseInputProps } from '@rovna-internal/components/types/BaseInputProps';

type AntSearchProps = React.ComponentPropsWithoutRef<typeof AntInput>;
export type SearchRef = React.ElementRef<typeof AntInput>;
export type SearchProps = Omit<AntSearchProps, 'allowClear' | 'prefix' | 'size'> &
  BaseInputProps &
  Pick<DimensionProperties, 'width'> &
  MarginProperties;
