import React from 'react';

export type NavigationItemProps = React.ComponentPropsWithoutRef<'li'> & {
  borderRadius?: React.CSSProperties['borderRadius'];
};
