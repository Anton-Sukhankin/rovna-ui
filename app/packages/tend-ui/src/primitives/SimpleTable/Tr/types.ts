import React from 'react';

export type TrRef = React.ElementRef<'tr'>;
export type TrProps = React.ComponentPropsWithRef<'tr'> & {
  selected?: boolean;
};
