import React from 'react';

export type TdRef = React.ElementRef<'td'>;
export type TdProps = React.ComponentPropsWithRef<'td'> & {
  textAlign?: React.CSSProperties['textAlign'];
};
