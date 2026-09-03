import React from 'react';
import AntTypography from 'antd-core/es/typography';

import { TypographyProps } from './types';

/**
 * @deprecated Не является компонентом типографии, будет удален в следующем мажорном обновлении
 */
const Typography = (props: TypographyProps) => {
  return <AntTypography data-testid='rovna-ui-typography' {...props} />;
};

Typography.displayName = 'Typography';

export { Typography };
