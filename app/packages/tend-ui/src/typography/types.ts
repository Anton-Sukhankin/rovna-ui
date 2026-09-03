import React from 'react';
import AntTypography from 'antd-core/es/typography';

import { Colors } from '@rovna-internal/components/theme/types/Colors';
import { LiteralUnion } from '@rovna-internal/components/types/LiteralUnion';

export const sizes = ['large', 'medium', 'small', 'xs'] as const;
export type Size = (typeof sizes)[number];
export type BaseTypographyProps = {
  uppercase?: boolean;
  color?: LiteralUnion<keyof Colors>;
  textAlign?: React.CSSProperties['textAlign'];
};
export type TypographyProps = React.ComponentPropsWithoutRef<typeof AntTypography>;
