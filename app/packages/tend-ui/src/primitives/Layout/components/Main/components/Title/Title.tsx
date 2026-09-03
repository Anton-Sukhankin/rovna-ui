import React from 'react';

import { Title as _Title } from '@rovna-internal/components/typography/Title';

import { TitleProps } from './types';

const Title = (props: TitleProps) => {
  return <_Title level='h3' mt={0} {...props} />;
};

Title.displayName = 'Layout.Header.Main.Title';

export { Title };
