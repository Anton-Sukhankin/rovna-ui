import React from 'react';

export type ThRef = React.ElementRef<'th'>;
export type ThProps = React.ComponentPropsWithRef<'th'> & {
  textAlign?: React.CSSProperties['textAlign'];
};
