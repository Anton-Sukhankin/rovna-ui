import React from 'react';

export type FieldRef = HTMLDivElement;
export type FieldProps = React.HTMLAttributes<HTMLDivElement> & {
  status?: 'error' | 'warning';
};
