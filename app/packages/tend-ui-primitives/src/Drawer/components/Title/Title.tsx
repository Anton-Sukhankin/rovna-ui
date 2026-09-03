import { Title as DefaultTitle } from '@rovna-ui/typography';
import React from 'react';

const Title = ({ children }: { children?: React.ReactNode }) => {
  return (
    <DefaultTitle level='h5' margin={0}>
      {children}
    </DefaultTitle>
  );
};

Title.displayName = 'Drawer.Title';

export { Title };
