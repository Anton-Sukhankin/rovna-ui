import React from 'react';
import Typography from 'antd-core/es/typography';
import { MarginProperties } from '@rovna-ui/styling';

import { BaseTypographyProps } from '../../types';

type AntTitleProps = React.ComponentPropsWithoutRef<typeof Typography.Title>;
type BaseTitleProps = {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'd1' | 'd2';
  uppercase?: boolean;
};
export type TitleProps = Omit<AntTitleProps, 'level'> &
  BaseTitleProps &
  BaseTypographyProps &
  MarginProperties;
