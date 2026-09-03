import React from 'react';

import { Title as _Title } from '@rovna-internal/components/primitives/Layout/components/Main/components';

import { TitleProps } from './types';

const Title = (props: TitleProps) => {
  return <_Title {...props} />;
};

Title.displayName = 'Layout.Main.Title';

export { Title };
