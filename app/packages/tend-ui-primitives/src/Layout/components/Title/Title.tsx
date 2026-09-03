import React from 'react';
import { Title as _Title } from '@rovna-ui/typography';

import { TitleProps } from './types';

const Title = (props: TitleProps) => {
  return <_Title level='h3' mt={0} {...props} />;
};

Title.displayName = 'Layout.Title';

export { Title };
